const express = require('express');
const profileRoutes = express.Router();
const Profile = require('../../controller/userProfile/profileController');

profileRoutes.get('/:id', Profile.getProfile);
profileRoutes.put('/info/:id', Profile.editProfile);
module.exports = profileRoutes;
