const bcrypt = require('bcrypt');
const UserService = require('../service/userService')

const handleNewUser = async (req,res) => {
  const {email, pwd, name } = req.body;
  if (!email || !pwd ) return res.status(400).json({ 'message': 'Wymagane Email i hasło'});

  const duplicate = await UserService.getUserByEmail(email)
  if (duplicate.userdata) return res.status(409).json({'message': 'Email jest już użyty'})

  try {
    const hashedPwd = bcrypt.hashSync(pwd, 10)
    const newUser = {
      name: name,
      email: email,
      hashPwd: hashedPwd
    }
    const result = await UserService.createUser(newUser)


    res.status(200).json({ 'success': 'Zarejestrowano'})
  } catch (err) {
    res.status(500).json({ 'meessage': err.message})
  }
}

module.exports = { handleNewUser }