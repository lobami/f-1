const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('index.ejs', { title: 'F+1 ' })
   
 });

 router.get('/contact', (req, res) => {
    res.render('contact.html', {title: "Contactanos" });
   
 });

 router.get('/dash',isAuthenticated, (req, res, next) => {
  res.render('dash.ejs', {title: "dashboard" });
});

 router.get('/signup',isAuthenticated, (req, res, next) => {
    res.render('signup', {title: "Loging" });
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
  
  router.get('/profile',isAuthenticated, (req, res, next) => {
    res.render('profile')
    
  });

  
  
  router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });
  
  
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/signin')
  }

  
  
  
  module.exports = router;