const express = require('express');
const profileRoutes = express.Router();
const Profile = require('../../controller/userProfile/profileController');

profileRoutes.get('/:id', Profile.getProfile);
profileRoutes.put('/:id/info', Profile.editProfile);
profileRoutes.post('/users', Profile.register);

module.exports = profileRoutes;
