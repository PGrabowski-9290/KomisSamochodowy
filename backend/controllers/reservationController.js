const ReservationService = require('../service/resrvationService')
const { updateOffertReservation } = require('../service/offersService')
const handleAddReservation = async (req, res) => {
  console.log(req)
  const {userId, reservationEnd, offerId} = req.body
  const startDate = new Date().toISOString().split('T')[0]
  const data = {
    userId: userId,
    reservationStart: startDate,
    reservationEnd: reservationEnd,
    offerId: offerId
  }

  try {
    const response = await ReservationService.addReservation(data)
    console.log(response)
    const response2 = await updateOffertReservation(offerId, 1)
    console.log(response2)
    res.status(200).json({message: "Reservation Made"})
  }catch (err) {
    res.status(500).json({err})
  }

}

module.exports = {handleAddReservation}