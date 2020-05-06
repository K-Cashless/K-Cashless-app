const functions = require("firebase-functions");

const express = require("express");
const app = express();
//const app = require('express')();

const FBAuth = require("./utility/fbAuth");
const FBAuthUser = require("./utility/fbAuthUser");
const FBAuthMerchant = require("./utility/fbAuthMerchant");
const FBAuthAdmin = require("./utility/fbAuthAdmin");

const cors = require("cors");
app.use(cors());

const { db } = require("./utility/admin");

const {
  adminSignup,
  adminLogin,
  getAdminData,
  getRequest,
  acceptRequest,
  createPromotion,
  getAllPromotions,
  generatePrepaidCard,
  getAllPrepaidCard,
  deleteOnePrepaidCards,
} = require("./handlers/admins");
const {
  signup,
  login,
  logout,
  getUserData,
  resetPass,
  uploadUserImage,
  addUserDetails,
  getAuthenticatedUser,
  topup,
  transfer,
  getAllUserData,
  updateUserDetails,
  redeemPoint,
  userGetMerchant,
  pushUserDeviceToken,
} = require("./handlers/users");
const {
  merchantSignup,
  merchantLogin,
  getMerchantData,
  getAllMerchantData,
  moneyRequest,
  updateMerchantDetails,
  uploadMerchantImage,
  pushMerchantDeviceToken,
} = require("./handlers/merchants");

const {
  getAllTransactions,
  getOneUserTransaction,
  getOneMerchantTransaction,
} = require("./handlers/transaction");

//Transaction route
app.get("/getAllTransactions", FBAuthAdmin, getAllTransactions);
app.get("/getOneUserTransaction", FBAuthUser, getOneUserTransaction);
app.get(
  "/merchant/getOneMerchantTransaction",
  FBAuthMerchant,
  getOneMerchantTransaction
);
//All user
app.get("/getAllPromotions", getAllPromotions);
//Admin route
app.post("/adminSignup", adminSignup);
app.post("/adminLogin", adminLogin);
app.get("/getAdminData", FBAuthAdmin, getAdminData);
app.get("/getAllMerchantData", FBAuthAdmin, getAllMerchantData);
app.get("/getAllUserData", FBAuthAdmin, getAllUserData);
app.get("/merchant/getRequest", FBAuthAdmin, getRequest);
app.post("/merchant/acceptRequest", FBAuthAdmin, acceptRequest);
app.post("/admin/createPromotion", FBAuthAdmin, createPromotion);
app.post("/admin/generatePrepaidCard", FBAuthAdmin, generatePrepaidCard);
app.get("/admin/getAllPrepaidCard", FBAuthAdmin, getAllPrepaidCard);
app.post(
  "/admin/deleteOnePrepaidCards/:cardID",
  FBAuthAdmin,
  deleteOnePrepaidCards
);
//Merchants route
app.post("/merchantSignup", merchantSignup);
app.post("/merchantLogin", merchantLogin);
app.get("/getMerchantData", FBAuthMerchant, getMerchantData);
app.post("/merchant/moneyRequest", FBAuthMerchant, moneyRequest);
app.post("/merchant/updateMerchantData", FBAuthMerchant, updateMerchantDetails);
app.post(
  "/merchant/pushMerchantDeviceToken",
  FBAuthMerchant,
  pushMerchantDeviceToken
);
app.post("/merchant/image", FBAuthMerchant, uploadMerchantImage);
//Users route
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", FBAuth, logout);
app.get("/getUserData", FBAuthUser, getUserData);
app.post("/resetPass", resetPass);
app.post("/user/image", FBAuthUser, uploadUserImage);
app.post("/user", FBAuthUser, addUserDetails);
app.get("/user", FBAuthUser, getAuthenticatedUser);
app.post("/prepaidCard/:cardID", FBAuthUser, topup);
app.post("/paid/:merchantID", FBAuthUser, transfer);
app.post("/user/updateData", FBAuthUser, updateUserDetails);
app.post("/user/redeemPoint", FBAuthUser, redeemPoint);
app.get("/user/getMerchant/:merchantID", FBAuthUser, userGetMerchant);
app.post("/user/pushUserDeviceToken", FBAuthUser, pushUserDeviceToken);

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

  exports.createNotificationOnMerchant = functions
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
*/
/*
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
