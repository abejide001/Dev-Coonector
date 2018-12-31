const ProfileModel = require('../model/Profile');
const UserModel = require('../model/User');

class Profile {
  static async getProfile(req, res) {
    // eslint-disable-next-line no-underscore-dangle
    const profile = await ProfileModel.findOne({ user: req.user.userId });
    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
      return;
    }
    res.status(200).json(profile);
  }

  static async createProfile(req, res) {
    const profileFields = {};
    // eslint-disable-next-line no-underscore-dangle
    profileFields.user = req.user.userId;
    profileFields.handle = req.body.handle;
    profileFields.bio = req.body.bio;
    profileFields.company = req.body.company;
    profileFields.website = req.body.website;
    profileFields.location = req.body.location;
    profileFields.status = req.body.status;
    profileFields.github = req.body.github;
    profileFields.skills = req.body.skills;
    profileFields.social = {};
    profileFields.social.youtube = req.body.youtube;
    profileFields.social.twitter = req.body.twitter;
    profileFields.social.instagram = req.body.instagram;
    profileFields.social.facebook = req.body.facebook;
    // eslint-disable-next-line no-underscore-dangle
    const profile = await ProfileModel.findOne({ user: req.user.userId }).populate('user', ['name']);
    if (profile) {
      res.status(404).json({
        success: false,
        message: 'User with the profile exists',
      });
      return;
    }
    const findHandle = await ProfileModel.findOne({ handle: req.body.handle });
    if (findHandle) {
      res.status(400).json({
        success: false,
        message: 'handle exist',
      });
      return;
    }
    const newProfile = new ProfileModel(profileFields);
    const result = await newProfile.save();
    res.status(201).json({ success: true, message: 'Profile created', result });
  }

  static async getHandle(req, res) {
    const handle = await ProfileModel.findOne({ handle: req.params.handle }).populate('user', ['name']);
    if (!handle) {
      res.status(400).json({
        success: false,
        message: 'handle does not exist',
      });
      return;
    }
    res.status(200).json({ success: true, handle });
  }

  static async getUser(req, res) {
    const profile = await ProfileModel.findOne({ handle: req.params.userId }).populate('user', ['name']);
    if (!profile) {
      res.status(400).json({
        success: false,
        message: 'profile does not exist',
      });
      return;
    }
    res.status(200).json({ success: true, profile });
  }

  static async getAllProfile(req, res) {
    const profiles = await ProfileModel.find().populate('user', ['name', 'email']);
    if (!profiles) {
      res.status(404).json({ success: false, message: 'no profiles' });
      return;
    }
    res.status(200).json({ success: true, profiles });
  }

  static async addExperience(req, res) {
    // eslint-disable-next-line no-underscore-dangle
    const profile = await ProfileModel.findOne({ user: req.user.userId });
    if (!profile) {
      res.status(404).json({ success: false, message: 'user with profile, not found ' });
      return;
    }
    const {
      title, location, from, to, description, current, company,
    } = req.body;
    const newExp = {
      title, location, from, to, description, current, company,
    };
    profile.experience.unshift(newExp);
    await profile.save();
    res.status(201).json({
      success: true,
      message: 'Experience created',
    });
  }

  static async addEducation(req, res) {
    // eslint-disable-next-line no-underscore-dangle
    const profile = await ProfileModel.findOne({ user: req.user.userId });
    if (!profile) {
      res.status(404).json({ success: false, message: 'user with profile, not found ' });
      return;
    }
    const {
      school, degree, from, to, fieldOfStudy, current,
    } = req.body;
    const newEdu = {
      school, degree, from, to, fieldOfStudy, current,
    };
    profile.education.unshift(newEdu);
    await profile.save();
    res.status(201).json({
      success: true,
      message: 'Education created',
    });
  }

  static async deleteExperience(req, res) {
    const profile = await ProfileModel.findOne({ user: req.user.userId });
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex);
    await profile.save();
    res.status(200).json({ success: true, message: 'Experience deleted' });
  }

  static async deleteProfile(req, res) {
    try {
      await ProfileModel.findOneAndRemove({ user: req.user.userId });
      const user = await UserModel.findOneAndRemove({ _id: req.user.userId });
      if (!user) {
        res.status(400).json({ success: true, message: 'User does not exist' });
        return;
      }
      res.status(200).json({ success: true, message: 'Deleted Successfully' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  }
}
module.exports = Profile;
