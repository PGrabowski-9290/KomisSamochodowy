const express = require('express');
const router = express.Router();
const ReservationController = require('../../controllers/reservationController')

router.post('/add', ReservationController.handleAddReservation)

module.exports = router