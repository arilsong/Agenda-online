const mongoose = require('mongoose')
const validator = require('validator')
const multer = require('multer');


const ContactSchema = new mongoose.Schema({
  name: {type: String, require: true},
  lastname:{ type: String, require: false, default: ''},
  email:{ type: String, require: true, default: ''},
  number:{ type: String, require: true, default: ''},
  createdat: {type: Date, default: Date.now},
  photo: { type: String, require: false, default: ''},
})


const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register(photo) {
    this.validate();
    this.body.photo = photo;
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);

  }

  async searchContacts(){
    const contatos = await ContactModel.find().sort({ createdat: -1});
    return contatos
  }

  async searchForId(id){
    if(typeof id !== 'string') return
    const contact = await ContactModel.findById(id)
    return contact;
  }

  async edit(id, photo){
    if(typeof id !== 'string') return
    this.validate()
    if(photo) this.body.photo = photo;
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id,this.body, {new: true}) 
  }

  async delete(id){
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findByIdAndDelete({ _id: id })
    return contact
  }

  validate(){
    this.cleanUp();
    
    if(this.body.email && !validator.isEmail(this.body.email)){
      this.push('Email inválido');
    }

    if(!this.body.name) this.errors.push('Nome é um campo obrigatorio')
    if(!this.body.email && !this.body.number) {
      this.errors.push('Pelo menos um contato deve ser enviado email ou telefone')
    }
  }

  cleanUp(){
    for(const key in this.body){
      if( typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
  }
  
}

module.exports = Contact;
