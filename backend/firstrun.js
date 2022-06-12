const userservice = require('./service/userService');
const bcrypt = require('bcrypt');
const install = async () => {
  console.log('Installing...');

  console.log('Creating database user...');
  const data = {
    email: "admin@admin.pl",
    name: "Admin",
    hashPwd: bcrypt.hashSync('admin', 10),
    role: 1
  }
  try{
    await userservice.createUser(data)
  }catch(err){
    console.log(err?.sqlMessage);
    process.exit(0)
  }

  console.log('Done')

  process.exit(0)
}

install()
