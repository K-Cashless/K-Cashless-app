const functions = require("firebase-functions");

const express = require("express");
const app = express();
//const app = require('express')();

const FBAuth = require("./utility/fbAuth");

const cors = require("cors");
app.use(cors());

const { db } = require("./utility/admin");

const {
  adminSignup,
  adminLogin,
  getAdminData,
  acceptRequest,
} = require("./handlers/admins");
const {
  signup,
  login,
  getUserData,
  resetPass,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  topup,
  transfer,
  getAllUserData,
  updateUserDetails,
  redeemPoint,
  userGetMerchant,
} = require("./handlers/users");
const {
  merchantSignup,
  merchantLogin,
  getMerchantData,
  getAllMerchantData,
  moneyRequest,
} = require("./handlers/merchants");

const {
  getAllTransactions,
  getOneTransaction,
} = require("./handlers/transaction");

//Transaction route
app.get("/getAllTransactions", getAllTransactions);
app.get("/getOneTransaction", FBAuth, getOneTransaction);
//Admin route
app.post("/adminSignup", adminSignup);
app.post("/adminLogin", adminLogin);
app.get("/getAdminData", FBAuth, getAdminData);
app.post("/merchant/acceptRequest", acceptRequest);
//Merchants route
app.post("/merchantSignup", merchantSignup);
app.post("/merchantLogin", merchantLogin);
app.get("/getMerchantData", FBAuth, getMerchantData);
app.get("/getAllMerchantData", getAllMerchantData);
app.post("/merchant/moneyRequest", FBAuth, moneyRequest);

//Users route
app.post("/signup", signup);
app.post("/login", login);
app.get("/getUserData", FBAuth, getUserData);
app.post("/resetPass", resetPass);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.post("/prepaidCard/:cardID", FBAuth, topup);
app.post("/paid/:merchantID", FBAuth, transfer);
app.get("/getAllUserData", getAllUserData);
app.post("/user/updateData", FBAuth, updateUserDetails);
app.post("/user/redeemPoint", FBAuth, redeemPoint);
app.get("/user/getMerchant/:merchantID", FBAuth, userGetMerchant);

exports.api = functions.region("asia-east2").https.onRequest(app);
/*
exports.createNotificationOnLike = functions
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => console.error(err));
  });
exports.deleteNotificationOnUnLike = functions
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });
exports.createNotificationOnComment = functions
  .region("asia-east2")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions
  .region("asia-east2")
  .firestore.document("/users/{userId}")
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("image has changed");
      const batch = db.batch();
      return db
        .collection("screams")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onScreamDelete = functions
  .region("asia-east2")
  .firestore.document("/screams/{screamId}")
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("screamId", "==", screamId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("screamId", "==", screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
*/
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello world");
});
