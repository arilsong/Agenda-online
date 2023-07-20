const Login = require('../modules/loginmodules')

exports.index = (req, res) => {
  if(!req.session.user) return res.render('login')
  
  res.redirect('home')
}

exports.login = async (req, res) => {
  try{
    const login = new Login(req.body);
    await login.login();
    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login')
      })
      return
    }

    req.flash('success', 'Bem-vindo')
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect('/home');
    })
  
  } catch(e){
    console.log(e)
    res.render('404')
  }
}

exports.logOut = (req, res) => {
  req.session.destroy()
  res.render('login')
}