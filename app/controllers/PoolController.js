// Create a pool

require('dotenv').config();

const NicehashJS = require('../nicehash/niceHashTest');
const nhClient = new NicehashJS(


  process.env.API_KEY,
  process.env.API_SECRET,
  process.env.ORGID,

//     "9d1d264f-9fe5-4706-99f2-98c9a17c112e"

// ,
// "35486024-8be3-408b-bc60-2eea3ac79e2b7b2fa903-1317-4349-8e61-6c0c5a750771"

// ,
// "485ed89e-a7bb-4d80-ba91-a36a3c4d84cc"

)
exports.createPool = async (req, res) => {
    try {
      const { Pool } = req.db.models;
      const { user_id } = req.body;
      const data_nicehash= req.body.nicehashpool;
  
      nhClient.createPool(data_nicehash, (err, data) => {

        if (err) {
            res.status(400).send({ message: err })
        }
        else {
            console.log("code")
              Pool.create({
        pool_id: data.body.id,
        user_id: user_id
      })
        .then
        ((pool) => 
        {
          res.status(200).json({pool,data:data.body,message:"pool created successfully"});
        }
        )
        .catch((err) => 
        {
          console.log(err);
          res.status(400).json({ error: 'Failed to create pool' });
        }
        );
            // res.status(200).send({ message: "Pool created successfully", data: data.body });
        }
    })


    
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get all pools
  exports.getPools = async (req, res) => {
    try {

      
      const { Pool } = req.db.models;
      const pools = await Pool.findAll();
      res.status(200).json({ pools });
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve pools' });
    }
  };
  
  // Get a pool by ID
  exports.getPoolById = async (req, res) => {
    try {
      const { Pool } = req.db.models;
      const { id } = req.params;
      const pool = await Pool.findByPk(id);
      if (pool) {
        res.status(200).json({ pool });
      } else {
        res.status(404).json({ error: 'Pool not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve pool' });
    }
  };
  
  // Update a pool
  exports.updatePool = async (req, res) => {
    try {
      const { Pool } = req.db.models;
      const { id } = req.params;
      const { pool_id,user_id } = req.body;
      const pool = await Pool.findByPk(id);
      if (pool) {
        await pool.update({ pool_id,user_id });
        res.status(200).json({ pool });
      } else {
        res.status(404).json({ error: 'Pool not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to update pool' });
    }
  };
  
  // Delete a pool
  exports.deletePool = async (req, res) => {
    try {
      const { Pool } = req.db.models;
      const { id } = req.params;
      const pool = await Pool.findByPk(id);
      if (pool) {
        await pool.destroy();
        res.status(200).json({ message: 'Pool deleted successfully' });
      } else {
        res.status(404).json({ error: 'Pool not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete pool' });
    }
  };
  

  exports.getnicehashpooldatawithid = async (req,res)=>{
    const {poolId} = req.query; 
    nhClient.getpoolwithid (poolId, (err,resp)=>{
      if(err){
        res.status(400).send(err)
      }else
      {
        res.status(200).send(resp)
      }
    })
  }