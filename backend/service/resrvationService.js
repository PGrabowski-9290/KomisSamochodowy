const db = require('../config/dbmysql2')

const addReservation = async (data) => {
  console.log(data)
  const sql = 'INSERT INTO `komis_samochodowy`.`reservation` (`reservationStart`, `reservationEnd`, Users_userId, Offers_offerId) VALUES (?,?,?,?)'
  return db.promise().execute(sql,[data.reservationStart, data.reservationEnd, data.userId, data.offerId])
    .then(({results}) => {
      return results
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

module.exports = {addReservation}