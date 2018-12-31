module.exports = {
  validateEducation(req, res, next) {
    const {
      school, degree, from, to, fieldOfStudy,
    } = req.body;
    if (!school || !degree || !from || !to || !fieldOfStudy) {
      res.status(400).json({
        success: false,
        message: 'Fields cannot be empty',
      });
      return;
    }
    if (school.length < 1) {
      res.status(400).json({
        success: false,
        message: 'school length should bg greater than 1',
      });
      return;
    }
    if (degree.length < 1) {
      res.status(400).json({
        success: false,
        message: 'degree length should bg greater than 1',
      });
      return;
    }
    if (fieldOfStudy.length < 1) {
      res.status(400).json({
        success: false,
        message: 'fieldofstudy length should bg greater than 1',
      });
      return;
    }
    next();
  },
};
