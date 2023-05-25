const express = require('express');
const router = express.Router();
const poolController = require('.././app/controllers/PoolController');

// Create a new pool
router.post('/createpool', poolController.createPool);

// Get all pools
router.get('/getpool', poolController.getPools);

// Get a pool by ID
router.get('/getpoolbyid/:id', poolController.getPoolById);

// Update a pool
router.put('/updatepool/:id', poolController.updatePool);

// Delete a pool
router.delete('/deletepool/:id', poolController.deletePool);

router.get('/getnicehashpooldatawithid', poolController.getnicehashpooldatawithid);

// getnicehashpooldatawithid

module.exports = router;
