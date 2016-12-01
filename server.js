var express = require('express');
var hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('serve.log', log + '/n');
  next();
});

// app.use(function(req, res, next){
//     res.render('maint.hbs');
//   });

hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});

app.get('/', function(req, res){
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to the Home Page',
    pageTitle: 'Home Page'
  });
});

app.get('/about', function(req, res){
res.render('about.hbs', {
  pageTitle: 'About Page'
});
});

app.get('/bad',function(req, res){
  res.send({
    errorMessage: "unable to get data"
  });
});


app.listen(3000, function(){
  console.log('Listening on 3000');
});
