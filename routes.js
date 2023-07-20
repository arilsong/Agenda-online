const express = require('express');

const routes = express.Router();

const loginController = require('./src/controllers/loginController');
const signupController = require('./src/controllers/signupController');
const homeControler = require('./src/controllers/homeController')
const contactControler = require('./src/controllers/contactController')
const photoControler = require('./src/controllers/photoController')

const {loginRequired, upload } = require('./src/middlewares/middleware')

//routes signup 
routes.get('/signup', signupController.index);
routes.post('/signup', signupController.register);

//rota login
routes.get('/login', loginController.index)
routes.post('/login', loginController.login)
routes.get('/login/logout',loginRequired, loginController.logOut)

//routes home
routes.get('/home',loginRequired, homeControler.index)

//contact 
routes.get('/contact',loginRequired, contactControler.index)
routes.post('/contact/register',loginRequired,upload.single('photo'), contactControler.register)
routes.get('/contact/index/:id',loginRequired, contactControler.editIndex)
routes.post('/contact/edit/:id',upload.single('photo'),  contactControler.edit)
routes.get('/contact/delete/:id',loginRequired, contactControler.delete)



module.exports = routes;
