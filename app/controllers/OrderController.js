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
            power_id:response.body.id,
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
       if(orders){
        res.status(200).send(orders)
       } else{
        res.status(400).send(orders)
       }



      // let result = JSON.parse(orders[1].order_details)
      // console.log(orders[1].order_details)
      // console.log(orders[1].order_details)
    
      // res.status(200).json( {orders} );
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve orders' });
    }
  };
  
  // Get an order by ID
  exports.getOrderById = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const {power_id} = req.query;
      nhClient.getOrder( power_id, async (err,resp)=>{

        if(err)
        {
          res.status(400).send(err)
        }
        else
        {
          if(resp)
          {
            const order = await Order.findOne({ where: { power_id: power_id,id:id } })
      if (order) {
        res.status(200).json({ "orderDetailfrom_Table_Data":order,"orderdetail_From_Nice_Hash_Order":resp});
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
          }
          // res.status(200).send(resp)
        }

      })
      
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve order' });
    }
  };
  
  // Update an order
  exports.updateOrder = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const {power_id} = req.query;
      const { pool_id,package_id } = req.body;
      const {orderdata} = req.body;

      nhClient.updateOrderPriceAndLimit (power_id, orderdata, async (err,resp)=>{
       if(err){
        res.status(400).send(err);
       }else
       {
        if(resp)
        {
          const order = await Order.findOne({ where: { power_id: power_id,id:id } })
          if (order) {
            await order.update(
              { 
               pool_id,
               package_id,
              }
             );
            res.status(200).json({ order });
          } else {
            res.status(404).json({ error: 'Order not found' });
          }
        }
       }
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Unable to update order' });
    }
  };
  
  // Delete an order
  exports.deleteOrder = async (req, res) => {
    try {
      const { Order } = req.db.models;
      const { id } = req.params;
      const {power_id} = req.query;
      nhClient.deleteOrder (power_id, async (err,resp)=>{
        if(err){
           res.status(400).send(err);
        }else{
             if(resp)
             {
              const order = await Order.findOne({ where: { power_id: power_id,id:id } })
              if (order) {
                await order.destroy();
                res.status(200).json({ message: 'Order deleted successfully' ,response_Nice_HashServer: resp});
              } else {
                res.status(404).json({ error: 'Order not found' });
              }
             }   
        }
      })
    
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Unable to delete order' });
    }};
  
    exports.getstatistics = async (req,res)=>{

      const {power_id} =req.query
      nhClient.getStats (power_id, (err,resp)=>{
           if(err)
           {
            res.status(400).send(err)
           }else{
            res.status(200).send(resp)
           }

      })

    } 