const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bio: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  github: {
    type: String,
  },
  experience: [{
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
  education: [{
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
  social: {
    youtube: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
