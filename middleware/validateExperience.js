module.exports = {
  validateExperience(req, res, next) {
    const {
      title, location, from, to, description, company,
    } = req.body;
    if (!title || !location || !from || !to || !description || !company) {
      res.status(400).json({
        success: false,
        message: 'Fields cannot be empty',
      });
      return;
    }
    if (title.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Title length should be greater than 1',
      });
      return;
    }
    if (location.length < 1) {
      res.status(400).json({
        success: false,
        message: 'location length should be greater than 1',
      });
      return;
    }
    if (description.length < 1) {
      res.status(400).json({
        success: false,
        message: 'Description length should be greater than 1',
      });
      return;
    }
    next();
  },
};
