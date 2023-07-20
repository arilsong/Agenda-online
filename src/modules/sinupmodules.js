const mongoose = require('mongoose');
const SignupModel = require('./UsersSchema')
const validator = require('validator');
const bcrypt = require('bcrypt')



class Signup {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }


  async register(){
    this.valida();
    if(this.errors.length > 0 ) return

    await this.userExist();
    if(this.errors.length > 0 ) return
  
    const salt = bcrypt.genSaltSync(10);
    this.body.password  = bcrypt.hashSync(this.body.password, salt)

    this.user = await SignupModel.create(this.body)
  }

  valida(){
    this.cleanup();

    if(!validator.isEmail(this.body.email)){
      this.errors.push('Email inválido')
    }

    if(this.body.password.length < 6 || this.body.password.length > 50){
      this.errors.push('A senha precisa estar entre 6 e 50 caracteres.')
    }
  }

  async userExist(){
    this.user = await SignupModel.findOne({ email: this.body.email })
    if(this.user) return this.errors.push('Esse email já existe')
    
  }

  cleanup(){
    for(const key in this.body){
      if( typeof this.body[key] !== 'string'){
        this.body[key] = ''
      }

      this.body = {
        email: this.body.email,
        password: this.body.password
      }
    }
  }

}

module.exports = Signup;