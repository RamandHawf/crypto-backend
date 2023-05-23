const express = require('express');
const router = express.Router();
const TransactonController = require('../app/controllers/TransactionsController');

// router.get('/login', TransactonController.loginPage);
router.post('/create_transaction', TransactonController.createTransaction);
router.get('/gettransactions', TransactonController.getTransactions);
router.get('/gettransactionbyid/:id', TransactonController.getTransactionById);
// router.get('/sign-up', TransactonController.signUpPage);
router.post('/updatetransaction/:id', TransactonController.updateTransaction);
// router.get('/forgot-password', TransactonController.forgotPasswordPage);
router.post('/deletetransaction/:id', TransactonController.deleteTransaction);
// router.get('/getalgorithm', TransactonController.getalgorithm);





module.exports = router;