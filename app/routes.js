// app/routes.js
var path = require('path')
var mongoose = require('mongoose');
var db = require('./models/index');
var bodyParser = require('body-parser')



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

    // Logout
    app.get('/profile/logout', function(req, res) {
        req.session.destroy(function (err) {
            console.log("Success?")
          });
    });

    // Get one deck
    app.get('/api/deck/:deckId', function(req,res) {
        console.log(req.params.deckId);
        db.Deck.findOne({'_id': req.params.deckId}, (err, response) => {
            if (err) throw err;

            res.json(response)
        })
    })

    // Get all decks
    app.get('/api/decks', function(req, res) {
        db.Deck.find({}, (err, result) => {
            if (err) throw err;
          
            res.json(result)
        })
    })

    // Get all decks by one user
    app.get('/api/user/decks/:userId', function(req, res) {
        db.Deck.find({ 'user': req.params.userId}, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
        
    })

    // Check if user is logged in and reurn info about user
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
        db.Deck.create({
            name: req.body.name,
            archetype: req.body.archetype,
            cost: req.body.cost,
            cards: req.body.cards,
            cost: 1200,
            user: req.body.user
        })
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