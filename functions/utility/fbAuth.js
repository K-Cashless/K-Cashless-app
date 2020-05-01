const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;
  let checkUser = false;
  let checkMerchant = false;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    checkUser = true;
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Mearer ")
  ) {
    checkMerchant = true;
    idToken = req.headers.authorization.split("Mearer ")[1];
  } 
  else if( req.headers.authorization &&
    req.headers.authorization.startsWith("Admin "))
    {
      checkAdmin = true;
      idToken = req.headers.authorization.split("Admin ")[1];
    } 
    else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  if(checkUser === true)
  {
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      req.user.firstName = data.docs[0].data().firstName;
      req.user.lastName = data.docs[0].data().lastName;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
  }
  else if(checkMerchant === true)
  {
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.merchant = decodedToken;
      return db
        .collection("merchants")
        .where("userId", "==", req.merchant.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.merchant.handle = data.docs[0].data().handle;
      req.merchant.storeName = data.docs[0].data().storeName;
      
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
  }
  else if(checkAdmin === true)
  {
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.admin = decodedToken;
      return db
        .collection("admins")
        .where("userId", "==", req.admin.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.admin.handle = data.docs[0].data().handle;
      
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
  }
};
