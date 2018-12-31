module.exports = {
  validateComment(req, res, next) {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({
        success: false,
        message: 'Fields cannot be empty',
      });
      return;
    }
    next();
  },
};
