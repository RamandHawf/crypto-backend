require('dotenv').config();
const Web3 =  require("web3");
const transactions = require('../../models/transactions');
const web3 = new Web3(`https://goerli.infura.io/v3/${process.env.APIKEY}`);
const axios = require("axios")


exports.createTransaction = async (req, res) => {
    // console.log(req.body)

    let data= `https://mainnet.infura.io/v3/9992ea8e1df4426782245acd1d14989f`
    try {
    const { Transaction } = req.db.models;
    console.log(Transaction)
 
    const { transactiondetail,transactionhash,to, from ,userid,packageid} = req.body;

    
    console.log("Name")
    Transaction.create({

      transactionDetail : transactiondetail,
      transactionHash : transactionhash,
        to:to,
        from:from,
        user_id:userid,
        package_id:packageid

    }).then((resp)=>{
         console.log("Dot")
        res.status(200).send(resp);
    }).catch((err)=>{
        console.log("Yes")
        console.log(err)
        res.status(400).send(err)
    })
    // const transactive = await Transactions.create(req.body);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }  
};

// Get all transactions
exports.getTransactions = async (req, res) => {
    const { Transaction } = req.db.models;

  try {
    const transactions = await Transaction.findAll();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve transactions' });
  }
};


exports.getTransactionsFromMetamask = async (req, res) => {

  try {

    const api_key = process.env.APIKEY
    const address = process.env.ADDRESS;
    const endpoint = process.env.URL_ETHERSCAN_GOERLI;
    // console.log()
    
axios
  .get(`${endpoint}/api?module=account&action=txlist&address=${address}&apiKey=${api_key}`)
  .then(response => {
    res.status(200).send(response.data.result);
  })
  .catch(error => {
    // Handle the error
    res.status(400).send(error);
    // console.error(error);
  });
  }
  catch(err)
  {
    res.status(500).send({err});
  }


};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    const { Transaction } = req.db.models;

  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      res.status(200).json({ transaction });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve transaction' });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const { Transaction } = req.db.models;

  try {
    const { id } = req.params;

    console.log(id)
    const { to, from } = req.body;
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      await transaction.update({ to, from });
      res.status(200).json({ transaction });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update transaction' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const { Transaction } = req.db.models;

  try {
    const { id } = req.params;
    console.log(id)
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      await transaction.destroy();
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete transaction' });
  }
};

// exports.getalgorithm= async (req, res) => {
//   const { Transaction } = req.db.models;

// try {
//   const { id } = req.params;
//   console.log(id)
//   const transaction = await Transaction.findByPk(id);
//   if (transaction) {
//     await transaction.destroy();
//     res.status(200).json({ message: 'Transaction deleted successfully' });
//   } else {
//     res.status(404).json({ error: 'Transaction not found' });
//   }
// } catch (error) {
//   res.status(500).json({ error: 'Unable to delete transaction' });
// }
// };