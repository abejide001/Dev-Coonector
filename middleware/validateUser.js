module.exports = {
  validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(400).send({
        success: false,
        messageName: 'Name Field cannot be empty',
      });
      return;
    }
    if (!password) {
      res.status(400).send({
        success: false,
        messagePassword: 'Password Field cannot be empty',
      });
      return;
    }
    if (!email) {
      res.status(400).send({
        success: false,
        messageEmail: 'Email Field cannot be empty',
      });
      return;
    }
    if (name.length < 3) {
      res.status(400).json({
        success: false,
        messageName: 'Name length should be greater than 3',
      });
      return;
    }
    if (email.length < 5) {
      res.status(400).json({
        success: false,
        messageEmail: 'Email length should be greater than 5',
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400).send({
        success: false,
        messageEmail: 'enter a valid email',
      });
      return;
    }
    if (password.length < 1) {
      res.status(400).json({
        success: false,
        messagePassword: 'Password length should be greater than 1',
      });
      return;
    }
    next();
  },

  validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send({
        success: false,
        messageEmail: 'Email Field cannot be empty',
      });
      return;
    }
    if (!password) {
      res.status(400).send({
        success: false,
        messagePassword: 'Password Field cannot be empty',
      });
      return;
    }
    if (email.length < 5) {
      res.status(400).json({
        success: false,
        messageEmail: 'Email length should be greater than 5',
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400).send({
        success: false,
        messageEmail: 'enter a valid email',
      });
      return;
    }
    if (password.length < 1) {
      res.status(400).json({
        success: false,
        messagePassword: 'Password length should be greater than 1',
      });
      return;
    }
    next();
  },
};
