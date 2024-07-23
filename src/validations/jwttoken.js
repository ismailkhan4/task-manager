const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateJwtToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY_JWT);
  return token;
};


const verifyJwtTown = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, decoded) {
    if (decoded.name) {
      return true
    } else {
      return false
    }
  });
};

module.exports = { generateJwtToken, verifyJwtTown };
