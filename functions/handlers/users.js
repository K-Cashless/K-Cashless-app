const { admin, db } = require("../utility/admin");

const config = require("../utility/config.js");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../utility/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  let token, userId;
  db.doc("/users/" + newUser.handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        deposit: 0,
        point: 0,
        createdAt: new Date().toISOString(),
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/" +
          config.storageBucket +
          "/o/" +
          noImg +
          "?alt=media",
        userId,
      };
      return db.doc("/users/" + newUser.handle).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })

    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(500).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ genaral: "Wrong credentials,please try again" });
      } else return res.status(500).json({ error: err.code });
    });
};
//Add user Detail
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc("/users/" + req.user.handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.like.push(doc.data());
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os"); //default package
  const fs = require("fs"); //file system

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);

    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    //image
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName =
      Math.round(Math.random() * 100000000000) + "." + imageExtension;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl =
          "https://firebasestorage.googleapis.com/v0/b/" +
          config.storageBucket +
          "/o/" +
          imageFileName +
          "?alt=media";
        return db.doc("/users/" + req.user.handle).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image Upload Successful" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};

exports.topup = (req, res) => {
  const prepaidCard = {
    number: req.body.number,
    value: req.body.value,
    deposit: req.body.deposit,
  };
  let cardData = {};
  db.doc(`/prepaidCard/${req.params.cardID}`)
    .get()
    .then((doc) => {
      console.log(doc.data().number);
      console.log(req.user.deposit);
      if (!doc.exists) {
        return res.status(404).json({ error: "Wrong CardID" });
      }
      if (
        prepaidCard.value !== doc.data().value ||
        prepaidCard.number !== doc.data().number
      ) {
        return res.status(404).json({ error: "Wrong value or number of card" });
      }
      if(doc.data().used === true){
        return res.status(404).json({ error: "This card is already use" });
      }
    })
    .then(()=>{
      //Fix for easy don't forget change used = True
      const used = false;
      return db.doc(`/prepaidCard/${req.params.cardID}`).update({ used });
    })
    .then(() =>{
      const whoUsed = req.user.handle;
      return db.doc(`/prepaidCard/${req.params.cardID}`).update({ whoUsed });
    })
    .then(()=>{
      db.doc(`/users/${req.user.handle}`)
      .get()
      .then((doc) => {
          console.log('tester '+ doc.data().deposit);
          const deposit = Number(doc.data().deposit) + Number(prepaidCard.value);
          return db.doc(`/users/${req.user.handle}`).update({ deposit });
      })
    })
    .then((data) => {
      console.log('done');
      return res.json({ message: "Top-Up Successful" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
