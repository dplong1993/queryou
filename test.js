const db = require("./db/models");
const {User} = db;

const testFunction = async () => {
  const users = await User.findAll();
  for(let user of users){
    console.log(user.id);
  }
};

testFunction();
