const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const Helper = require('../helper/token');
const UserModel = require('../model/User');

class User {
  static async register(req, res) {
    try {
      let {
        // eslint-disable-next-line prefer-const
        email, name, password,
      } = req.body;
      let user = await UserModel.findOne({ email });
      if (user) {
        res.status(400).json({
          success: false,
          message: 'User with the email exist',
        });
        return;
      }
      const avatar = gravatar.url(email, { s: '200', d: 'mm' });
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      user = new UserModel({
        email, name, password, avatar,
      });
      await user.save();
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      res.send(err.message)
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }
    const token = Helper.generateToken(user);
    res.status(200).json({
      success: true,
      message: 'logged in',
      token,
      user: user.email,
    });
  }
}
module.exports = User;
