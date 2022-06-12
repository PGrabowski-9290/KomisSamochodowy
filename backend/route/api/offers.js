const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');
const verifyRole = require('../../middleware/verifyRole');
const offersController = require('../../controllers/offersController')

router.route('/')
  .get(offersController.handleGetAllOffers)

router.get('/:id', offersController.handleGetOffert);

module.exports = router;