const contact = require('../modules/contactmodules')

exports.index = async (req, res) => {
  const contacts = await contact.prototype.searchContacts();
  res.render('home', {contacts})
}