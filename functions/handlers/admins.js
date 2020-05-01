const { admin, db } = require("../utility/admin");

const config = require("../utility/config.js");

const firebase = require("firebase");

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../utility/validators");

exports.adminSignup = (req, res) => {
  const newAdmin = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    phone: req.body.phone,
  };

  const { valid, errors } = validateSignupData(newMerchant);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.jpg";

  let token, userId;
  db.doc("/merchants/" + newMerchant.handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ message: "This handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newMerchant.email,
            newMerchant.password
          );
      }
    })
    .then((data) => {
      console.log("pass");

      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        handle: newAdmin.handle,
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        phone: newAdmin.phone,
        createdAt: new Date().toISOString(),
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/" +
          config.storageBucket +
          "/o/" +
          noImg +
          "?alt=media",
        userId,
      };
      return db.doc("/merchants/" + newMerchant.handle).set(userCredentials);
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

exports.adminLogin = (req, res) => {
  const admin = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(admin);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(admin.email, admin.password)
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
          .json({ message: "Wrong credentials,please try again" });
      } else return res.status(500).json({ error: err.code });
    });
};
//Get Merchant Data
exports.getAdminData = (req, res) => {
  let merchantData = [];
  db.doc(`/merchants/${req.merchant.handle}`)
    .get()
    .then((doc) => {
      console.log("mh" + req.merchant.handle);

      merchantData.push({
        userId: doc.id,
        handle: doc.data().handle,
        email: doc.data().email,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        phone: doc.data().phone,
        imageUrl: doc.data().imageUrl,
        createdAt: doc.data().createdAt,
      });
      console.log(merchantData);
      return res.json(merchantData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.acceptRequest = (req, res) => {
  const data = {
    handle: req.body.handle,
  };
  db.doc(`/RequestToAdmins/${data.handle}`)
    .get()
    .then((doc) => {
      let temp = doc.data().amount;
      if (!doc.exists) {
        check = false;
        return res.status(404).json({ error: "Not Found" });
      }
      else if (doc.data().accept === false && doc.data().status === "Pending")
      {
        db.doc(`/merchants/${data.handle}`)
        .get()
        .then((doc) => {
          const total = Number(doc.data().total) - temp;
          db.doc(`/merchants/${data.handle}`).update({ total });
          return res.json({ message: "Received money" });
        })
        .then((doc) => {
          const status = "Done";
          return db.doc(`/RequestToAdmins/${data.handle}`).update({ status });
        })
        .then((doc) => {
          const accept = true;
          return db.doc(`/RequestToAdmins/${data.handle}`).update({ accept });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: err.code });
        });
      }
      else 
      {
        return res.json({ error: "Accepted Already, Please Contract to Admin" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//Notification
//Promotion
//Generate card
