const LoginModel = require('./UsersSchema')
const validator = require('validator');
const bcrypt = require('bcrypt')




class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }


  async login(){
    this.cleanup();
    
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user){
      return this.errors.push('Usuario não existe');
    }

    if(!bcrypt.compareSync(this.body.password, this.user.password)){
      this.errors.push('Usuario ou senha invalido')
      this.user = null
      return 
    }

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

module.exports = Login;