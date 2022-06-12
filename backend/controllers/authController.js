const UserService = require('../service/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res) => {
  const {email, pwd} = req.body;
  if ( !email || !pwd ) return res.status(400).json({'message': 'Wymagane dane'});

  const { userdata } = await UserService.getUserByEmail(email);
  if (!userdata) return res.status(401).json({'message': 'Brak użytkownika o podanym adresie email'});

  const match = await bcrypt.compare(pwd, userdata.hashedPassword);
  if (match) {
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "emial": userdata.email,
          "role": userdata.role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '900s'}
    );
    const refreshToken = jwt.sign(
      { "email": userdata.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    console.log('userdata: ',userdata)
    const resuldtDB = UserService.updateRefToken(userdata.email, refreshToken);

    res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000});

    res.json({userId: userdata.userId, role: userdata.role, name: userdata.name, accessToken: accessToken})
  } else {
    res.status(401).json({message: "Unauthorized"})
  }
}

const handleLogout = async (req,res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.status(204).json({message: 'Success'});

  const refreshToken = cookies.jwt;

  const foundUser = await UserService.findByToken(refreshToken)
  if(!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'});
    return res.status(204).json({message: 'Success'});
  }

  const resuldtDB = UserService.updateRefToken(foundUser.email, null);
  console.log(resuldtDB);

  res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'});
  return res.status(204).json({message: 'Success'});
}


module.exports = { handleLogin, handleLogout }