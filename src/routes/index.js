const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../models/task');

router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'F+1 ' })

});

router.get('/contact', (req, res) => {
  res.render('contact.html', { title: "Contactanos" });

});

router.get('/dash', isAuthenticated, (req, res, next) => {
  res.render('dash.ejs', { title: "dashboard" });
});

router.get('/signup', isAuthenticated, (req, res, next) => {
  res.render('signup', { title: "Loging" });
});


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile', { title: "Perfil" })

});



router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signin')
}
// A PARTIR DE AQUI ES LA LISTA DE PENDIENTES...



router.get('/list', isAuthenticated, async (req, res) => {
  const tasks = await Task.find();
  res.render('list.ejs', {
    tasks
  });
});

router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/list');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/list');
});


router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect('/list');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect('/list');
});

module.exports = router;