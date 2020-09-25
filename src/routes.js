const express = require('express');

const AccountController = require('./controller/AccountController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/account', AccountController.index);
routes.post('/account', AccountController.create);

routes.get('/profiles', ProfileController.index);
routes.post('/profiles', ProfileController.create);
routes.delete('/profiles/:id', ProfileController.delete);

module.exports = routes;
