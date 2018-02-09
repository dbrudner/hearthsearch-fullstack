// app/routes.js
var path = require('path')
var mongoose = require('mongoose');
var db = require('./models/index')


function Deck(name, cards, archetype, user, cost) {
    this.name = name
    this.cards = cards
    this.archetype = archetype
    this.user = user
    this.cost = cost
}

module.exports = function(app, passport) {

    app.get('/myprofile', isLoggedIn, function(req, res) {
        

        res.json(req.user)
    });

    app.get('/profile/logout', function(req, res) {
        req.session.destroy(function (err) {
            console.log("Success?")
          });
    });

    
      

    app.get('/test', function(req, res) {
        res.json(req.user)
    })

    app.post('/signup', passport.authenticate('local-signup'), function(req,res) {
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login'), function(req,res) {
        res.redirect('/')
    });

    app.post('/newdeck', function(req, res) {
        db.Deck.create(new Deck(req.params.name, req.params.cards, req.params.archetype, req.params.user, req.params.cost))
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'));
      });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    // res.redirect('/');
    res.json("Not logged in");
}