const db = require('../config/dbmysql2');
  
const getBrands = async () => {
  return await db.promise().query('SELECT * FROM brands')
    .then( (results, fields) => {
      return results[0];
    })
    .catch(err => {
      throw err;
    });
}

const getFuels = async () => {
  return await db.promise().query('SELECT * FROM fueltypes')
    .then( (results, fields) => {
      return results[0];
    })
    .catch(err => {
      throw err;
    })
}

module.exports = { getBrands, getFuels }