const { admin, db } = require("../utility/admin");

const config = require("../utility/config.js");

const firebase = require("firebase");

//Get All transactions
exports.getAllTransactions = (req, res) => {
  let transactionData = [];
  db.collection("transactions")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        transactionData.push({
          createdAt: doc.data().createdAt,
          from: doc.data().from,
          to: doc.data().to,
          amount: doc.data().amount,
        });
      });
      console.log(transactionData);

      return res.json(transactionData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.getOneTransaction = (req, res) => {
  db.collection("transactions")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let userData = [];
      data.forEach((doc) => {
        if (doc.data().from === req.user.handle) {
          userData.push({
            createdAt: doc.data().createdAt,
            from: doc.data().from,
            to: doc.data().to,
            amount: doc.data().amount,
            info: doc.data().info,
          });
        }
      });
      console.log(userData);

      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
