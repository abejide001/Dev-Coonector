module.exports = {
  validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Fields cannot be empty',
      });
      return;
    }
    if (name.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Name length should bg greater than 1',
      });
      return;
    }
    if (email.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Email length should bg greater than 1',
      });
      return;
    }
    if (password.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Password length should bg greater than 1',
      });
      return;
    }
    next();
  },

  validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Fields cannot be empty',
      });
      return;
    }
    if (email.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Email length should bg greater than 1',
      });
      return;
    }
    if (password.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Password length should bg greater than 1',
      });
      return;
    }
    next();
  },
};
