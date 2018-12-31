const express = require('express');
const Profile = require('../../controller/profileController');
const Auth = require('../../middleware/verifyToken');
const ValidateExperience = require('../../middleware/validateExperience');
const ValidateEducation = require('../../middleware/validateEducation');

const router = express.Router();

router.get('/current', Auth.verifyToken, Profile.getProfile);
router.post('/create', Auth.verifyToken, Profile.createProfile);
router.get('/handle/:handle', Auth.verifyToken, Profile.getHandle);
router.get('/user/:user_id', Auth.verifyToken, Profile.getUser);
router.get('/all', Profile.getAllProfile);
router.post('/experience', ValidateExperience.validateExperience, Auth.verifyToken, Profile.addExperience);
router.post('/education', ValidateEducation.validateEducation, Auth.verifyToken, Profile.addEducation);
router.delete('/experience/:exp_id', Auth.verifyToken, Profile.deleteExperience);
router.delete('/', Auth.verifyToken, Profile.deleteProfile);

module.exports = router;
