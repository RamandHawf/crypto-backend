// Create an order


require('dotenv').config();

const NicehashJS = require('../nicehash/niceHashTest');
const nhClient = new NicehashJS(


  process.env.API_KEY,
  process.env.API_SECRET,
  process.env.ORGID,

)
exports.createOrder = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { user_id,package_id } = req.body;
  
      let order_details= "";
      let nicehash_order = req.body.nicehash_orderdata;

      nhClient.createOrder(nicehash_order, (err, response) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        else {
            if(response?.body){
                Order.create
            (
            {
            // order_details : JSON.stringify(response.body),
            user_id : user_id,
            package_id : package_id,
            pool_id : req.body.nicehash_orderdata.pool_id,
            }
            )
            .then((order) => {
              res.status(200).json({order,message:response.body});
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: 'Failed to create order' });
            });
            }
            else if(response.body.errors){
                console.log("code")
                res.send({ message: response.body });

            }
            
                    }
    })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get all orders
  exports.getOrders = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const orders = await Order.findAll();

      // let result = JSON.parse(orders[1].order_details)
      // console.log(orders[1].order_details)
      // console.log(orders[1].order_details)
    
      res.status(200).json( {orders} );
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve orders' });
    }
  };
  
  // Get an order by ID
  exports.getOrderById = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (order) {
        res.status(200).json({ order });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve order' });
    }
  };
  
  // Update an order
  exports.updateOrder = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const { pool_id,package_id } = req.body;
      const order = await Order.findByPk(id);
      if (order) {
        await order.update({ pool_id,package_id });
        res.status(200).json({ order });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to update order' });
    }
  };
  
  // Delete an order
  exports.deleteOrder = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (order) {
        await order.destroy();
        res.status(200).json({ message: 'Order deleted successfully' });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete order' });
    }
  };
  