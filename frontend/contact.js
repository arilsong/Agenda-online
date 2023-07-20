import './assets/css/contact.css'

//photo 
const photoInput = document.getElementById('photoInput')
const photoLabel = document.getElementById('photoLabel')
const previewImage = document.getElementById('previewImage')

//validation 
const formContact = document.getElementById('formContact')


//photo script
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImage.src = e.target.result
  }

  if(file) {
    reader.readAsDataURL(file)
  }else {
    previewImage.src = '#';
    photoLabel.textContent = 'Carregar uma foto'
  }
})

//validation
function createError(field, msg){
  const p = document.createElement('p');
  p.innerText = msg;
  p.classList.add('error-text')
  field.insertAdjacentElement('afterend', p)
}


formContact.addEventListener('submit', function(e) {
e.preventDefault()

const name = this.name
const lastname = this.lastname
const email= this.email
const number = this.number
let valid = true

for (let errorText of document.querySelectorAll('.error-text')){
  errorText.remove();
}

if(!name.value){
  createError(name, 'Email inválido')
  valid = false;
}

if(!email.value && !number.value){
  createError(email, 'Preencha o campo este ou umero')
  valid = false;
}

if (valid) this.submit()
})