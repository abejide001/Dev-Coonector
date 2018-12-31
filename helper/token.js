const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
class Helper {
  static generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
}
module.exports = Helper;
