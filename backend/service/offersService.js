const db = require('../config/dbmysql2');

const getOffert = async (offerId) => {
  const sql = 'SELECT o.*, b.name AS "brandName" FROM offers AS o JOIN brands AS b ON b.brandId=o.Brands_brandId WHERE offerId = ?';

  return await db.promise().query(sql, [offerId])
    .then( async (results, fields) => {
      var row = results[0][0];
      
      if (!row) {
        return {};
      }
      row = {...row, Images: await getOffersImages(row.offerId)}
      return row;
    })
    .catch (err => {
      throw err;
    })
}

const getOffers = async () => {
  const sql = 'SELECT offerId, prize, title, odometer FROM offers where isActive = 1 and isReserved = 0';
  return await db.promise().query(sql)
    .then( async (results, fields) => {
      const array = await Promise.all(results[0]?.map(async (el) => { 
        return {...el, images: await getOneOfferImage(el.offerId)}
      }))
      return array;
      // return results[0]
    })
    .catch(err => {
      throw err;
  })
}

const getOneOfferImage = async (id) => {
  const sql = 'SELECT * FROM offersimages WHERE Offers_offerId = ? LIMIT 1'
  return await db.promise().query(sql, [id])
    .then((results, fields) => {
      console.log(results[0])
      return results[0][0]
    })
    .catch((err) => {
      throw err;
    })
}

const getOffersImages = async (id) => {
  const sql = 'SELECT * FROM offersimages WHERE Offers_offerId = ?'
  return await db.promise().query(sql, [id])
    .then((results, fields) => {
      console.log(results[0])
      return results[0]
    })
    .catch((err) => {
      throw err;
    })
}

const updateOffertReservation = async (id, value) => {
  const sql='UPDATE komis_samochodowy.offers SET isReserved=? WHERE  offerId=?'
  return db.promise().execute(sql,[value,id])
}

module.exports = { getOffers, getOffert, updateOffertReservation }