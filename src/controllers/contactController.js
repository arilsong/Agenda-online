const fs = require('fs');
const path = require('path');
const Contact = require('../modules/contactmodules');
const { photo } = require('./photoController');

exports.index = (req, res) => {
  res.render('contact', {
    contact: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const photo = req.file ? req.file.filename : '';
    await contact.register(photo);

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/home'));
      return;
    }
    req.flash('success', 'Contato criado com sucesso');
    req.session.save(() => res.redirect('/home'));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.editIndex = async (req, res) => {
  try {
    if (!req.params.id) return;
    const contact = await Contact.prototype.searchForId(req.params.id);

    if (!contact) return res.render('404');

    res.render('contact', { contact });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.edit = async (req, res) => {
  try {
    const photo = req.file ? req.file.filename : '';
    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(req.params.id, photo);
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact/index'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => res.redirect('/home'));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const contact = await Contact.prototype.delete(req.params.id);
  const filepath = path.resolve(__dirname, '..', 'uploads', `${contact.photo}`);
  if (contact.photo) {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error('Erro ao excluir o arquivo:', err);
      }
    });
  }

  if (!contact) return res.render('404');
  req.flash('success', 'Contato apagado');
  req.session.save(() => res.redirect('/home'));
};
