const path = require("path");
// load dependencies
const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
var { expressjwt: jwt } = require("express-jwt");
const cors = require('cors');


const app = express();
// app.use(cors());

app.use(cors({
  origin: 'http://15.152.206.151'
}));








//Loading Routes
const webRoutes = require("./routes/web");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const transactionroutes = require("./routes/transactions_d")
const poolRoutes = require('./routes/pool_d');
const orderRoutes = require('./routes/order_d');

const { sequelize } = require("./models/index");
const errorController = require("./app/controllers/ErrorController");

env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  jwt({
    secret: process.env.JWT_TOKEN_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: [

      "/api/auth/sign-up",
      "/api/auth/login",
      "/api/auth/reset-password",
      "/api/auth/forget-password",
      "/api/auth/verify",
      // "/api/transaction/gettransactionbyid/:id",
      "/api/money/create_transaction",
      "/api/test",
      // "/api/money/metamasktransactiondata",
      // "/api/order/create_order",
      // "/api/order/delete_order/21",
      // "/api/order/create_order",
      // "/api/order/getorder",
      // "/api/order/getorderbyid/20",

      // "/api/order/delete_order/20",
      //   "/api/ping",
      // "/api/order/update_order/2",
      // "/api/order/update_order/20",
      // "/api/order/getorderstats",
      // "/api/pool/getnicehashpooldatawithid",
    ],
  })
);
app.use((req, res, next) => {
  req.db = sequelize;
  next();
});
app.use("/api", webRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/money", transactionroutes);
app.use('/api/pool', poolRoutes);
app.use('/api/order',orderRoutes);



sequelize
  // .sync({ force: true })
  .sync({ alter: true })
  // .sync()
  .then(() => {
    app.listen(process.env.PORT);
    //pending set timezone
    console.log("App listening on port " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
