require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const { middlewareGlobal, pageEror, upload } = require('./src/middlewares/middleware');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes');
const app = express();
const port = '3000';


//configurando mongooose 
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
  console.log('conectei ao banco de dados');
  app.emit('pronto');
})
.catch( e => console.log(e))



app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json()); // Para JSON-encoded
app.use(express.urlencoded({ extended: true })); // Para URL-encoded

// Configuração do middleware de sessão

app.use(session({
  secret: 'fhhhfs84bdhds9KLTHhhI3rYfbjdRVjvlDfçFVcd',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
  }
}))


// Configuração do middleware connect-flash
app.use(flash());


app.use(middlewareGlobal)
app.use(express.static(path.resolve(__dirname, 'src', 'uploads')));

// Configuração do EJS como mecanismo de visualização
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(route);
app.use((req, res, next) => {
  res.status(404).send('Rota não encontrada');
});

// Inicia o servidor
app.on('pronto', () => {
  app.listen(port, () => {
    console.log(`servidor iniciado na porta ${port}`);
    console.log(`http://localhost:${port}`);
  });
})



