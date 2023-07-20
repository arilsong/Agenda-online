const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  name: String,
  photo: String // Campo para armazenar a referência à foto
});

const Photo = mongoose.model('User', PhotoSchema);

module.exports = Photo;


