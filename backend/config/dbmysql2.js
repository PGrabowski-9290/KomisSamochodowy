const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: '127.0.0.1',
  user: 'sakomis',
  password: 'simokas',
  database: 'komis_samochodowy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool;