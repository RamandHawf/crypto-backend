
exports.createTransaction = async (req, res) => {
    // console.log(req.body)
    try {
    const { Transaction } = req.db.models;
    console.log(Transaction)
 
    const { to, from ,userid,packageid} = req.body;

    
    console.log("Name")
    Transaction.create({

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