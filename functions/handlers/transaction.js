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
