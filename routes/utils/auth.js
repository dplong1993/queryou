const jwt = require('jsonwebtoken');
const {secret, expiresIn} = require('../../config').jwtConfig;

const db = require('../../db/models');
const { User } = db;

exports.getUserToken = (user) => {
  return jwt.sign({id: user.id, email: user.email},
    secret,
    {expiresIn: parseInt(expiresIn)}
  );
}

//Get user from database based on given token
exports.getUserFromToken = async (token) => {
  try {
    //get the payload by verifying the token using the secret
    const payload = jwt.verify(
      token,
      secret
    );

    //Use the id field of the payload to get correct user form database
    return await User.findByPk(payload.id);

  } catch (err) {
    //There was an error, so couldn't get the user so return null
    return null;
  }
};
