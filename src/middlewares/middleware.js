const multer = require('multer');
const express = require('express');
const router = express.Router();

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
      req.flash('errors', 'Voce precisa fazer login');
      req.session.save(() => res.redirect('/login'));
      return
  }

  next();
}

exports.pageEror = (req, res, next) => {
  const error = new Error('Rota não encontrada');
  error.status = 404;
  next(error);
};

const aleatorio = () => Math.floor(Math.random() + 10000 + 10000);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // Pasta onde as fotos serão armazenadas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_'+ aleatorio() + file.originalname); // Nome original do arquivo
  }
});

exports.upload = multer({ storage: storage });