const express = require('express');
const router = express.Router();
const dictController = require('../../controllers/dictController');

router.get('/fuels', dictController.handleGetFuels);
router.get('/brands', dictController.handleGetBrands);

module.exports = router;