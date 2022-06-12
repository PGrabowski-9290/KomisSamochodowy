const db = require('../config/dbmysql2');
const ROLES_LIST = require('../config/roles_list');

const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE mail = ?';
  let userdata = {};

  return await db.promise().query(sql, [email])
    .then((results, fields) => {
      console.log(results[0][0])
      if(results[0][0]) {
        userdata.userId = results[0][0].userId;
        userdata.name = results[0][0].firstName;
        userdata.email = results[0][0].mail;
        userdata.hashedPassword = results[0][0].hashedPassword;
        userdata.role = results[0][0].Roles_roleId;
        userdata.refreshToken = results[0][0].refreshToken;
      }
      else {
        userdata = null;
      }
      

      return { userdata }
    })
    .catch(err => {
      return {error: err, userdata: null};
    }) 
}

const findByToken = async (token) => {
  const sql = 'SELECT * FROM users WHERE refreshToken = ?';
  let userdata = {};

  return db.promise().query(sql, [token])
    .then((results, fields) => {
      userdata.userId = results[0][0].userId;
      userdata.name = results[0][0].firstName;
      userdata.email = results[0][0].mail;
      userdata.hashedPassword = results[0][0].hashedPassword;
      userdata.role = results[0][0].Roles_roleId;
      userdata.refreshToken = results[0][0].refreshToken;

      return { userdata }
    })
    .catch(err => {
      return {error: err, userdata: null};
    }) 
}

const updateRefToken = async (email, refreshToken) => {
  const sql = "UPDATE users set refreshToken = ? where mail = ?"

  return db.promise().execute(sql, [refreshToken,email]);
}

const createUser = async (newUserData) => {
  try {
    const mail = newUserData.email.toLowerCase();
    const firstName = newUserData.name;
    const hashedPassword = newUserData.hashPwd;
    const roleId = 3;
    const sql = 'INSERT INTO `users` (`mail`, `hashedPassword`, `firstName`, `Roles_roleId`) VALUES (?,?,?,?)';

    return db.promise().execute(sql, [mail,hashedPassword, firstName, roleId]);
  } catch (err) {
    return Promise.reject(err)
  }
}


module.exports={
  createUser,
  getUserByEmail,
  updateRefToken,
  findByToken
}