const { admin, db } = require("../utility/admin");

const config = require("../utility/config.js");

const firebase = require("firebase");

//firebase.initializeApp(config);

const {
    validateSignupData,
    validateLoginData,
    reduceUserDetails,
  } = require("../utility/validators");
  
  exports.merchantSignup = (req, res) => {
    const newMerchant = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
      storeName: req.body.storeName,
      ownerName: req.body.ownerName,
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
            .createUserWithEmailAndPassword(newMerchant.email, newMerchant.password);
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
          handle: newMerchant.handle,
          email: newMerchant.email,
          storeName: newMerchant.storeName,
          ownerName: newMerchant.ownerName,
          phone: newMerchant.phone,
          total: 0,
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
  
  exports.merchantLogin = (req, res) => {
    const merchant = {
      email: req.body.email,
      password: req.body.password,
    };
    const { valid, errors } = validateLoginData(merchant);
    if (!valid) return res.status(400).json(errors);
  
    firebase
      .auth()
      .signInWithEmailAndPassword(merchant.email, merchant.password)
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
exports.getMerchantData = (req,res) =>{
    let merchantData = [];
    db.doc(`/merchants/${req.user.handle}`)
      .get()
      .then((doc) => {
          merchantData.push({
            userId: doc.id,
            handle: doc.data().handle,
            email: doc.data().email,
            storeName: doc.data().storeName,
            ownerName: doc.data().ownerName,
            phone: doc.data().phone,
            total:doc.data().total,
            imageUrl: doc.data().imageUrl,
            createdAt: doc.data().createdAt,
          });
        console.log(merchantData);
        return res.json(merchantData);
      })
  }
  //Get Merchant user
  exports.getAllMerchantData = (req, res) => {
    let merchantData = [];
    db.collection("merchants")
      .get()
      .then(data => {
        data.forEach(doc => {
        merchantData.push({
            userId: doc.id,
            handle: doc.data().handle,
            email: doc.data().email,
            storeName: doc.data().storeName,
            ownerName: doc.data().ownerName,
            phone: doc.data().phone,
            total:doc.data().total,
            imageUrl: doc.data().imageUrl,
            createdAt: doc.data().createdAt,
          });
        });
        console.log(merchantData);
        
        return res.json(merchantData);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };