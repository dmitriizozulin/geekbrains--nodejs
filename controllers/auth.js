const User = require('../models/users');

(async () => {
  await User.init();
  console.log('Initializing users...');
})();

const getLogin = async (req, res) => {
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.render('auth/login', { username: req.cookies.username });
  }
};

const postLogin = async (req, res) => {
  const { username, password, rememberMe } = req.body;
  const user = await User.getByUsername(username);

  if (req.session.username) {
    req.session.destroy();
  }

  if (rememberMe) {
    res.cookie('username', username, {
      maxAge: 2592000000,
    });
  } else {
    res.cookie('username', '');
  }

  if (user && User.checkPassword(password, user.password)) {
    req.session.username = username;
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

const getRegistration = async (req, res) => {
  res.render('auth/register');
};

const postRegistration = async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    res.redirect('/auth/signup');
    return;
  }

  const user = await User.getByUsername(username);

  if (user) {
    res.redirect('/auth/login');
    return;
  }

  await User.create(username, password);

  res.redirect('/auth/login');
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegistration,
  postRegistration,
};
