module.exports = {
  validateProfile(req, res, next) {
    const { handle, bio, company, website, location, github, status, social, skills } = req.body;
      if (!status || !skills || !handle || !bio || !company || !website || !location || !github || !social.twitter || !social.youtube || !social.facebook || !social.instagram) {
        res.status(400).json({
          success: false,
          message: 'Fields cannot be empty',
        });
        return;
      }
      next(); 
    }
}