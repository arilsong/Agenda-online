import './assets/css/signup_style.css';
import validator from 'validator';

const form = document.getElementById('form')

function createError(field, msg){
  const p = document.createElement('p');
  p.innerText = msg;
  p.classList.add('error-text')
  field.insertAdjacentElement('afterend', p)
}


form.addEventListener('submit', function(e){
  e.preventDefault();
  
  const email = this.email
  const password = this.password
  let valid = true
  
  for (let errorText of document.querySelectorAll('.error-text')){
    errorText.remove();
  }
  
  if(!validator.isEmail(email.value)){
    createError(email, 'Email inválido')
    valid = false;
  } 
  
  if( password.value.length < 6 || password.value.length > 50){
    createError(password, 'A senha precisa estar entre 6 e 50 caracteres')
    valid = false;
  }
  
  if (valid) this.submit()

  
})
  
