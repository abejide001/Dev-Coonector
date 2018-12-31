const jwt = require('jsonwebtoken');

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) {
      res.status(401).json({ success: false, message: 'Token is not provided' });
      return;
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
module.exports = Auth;
