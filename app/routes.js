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

    app.get('/api/cards', function(req, res) {
        db.Card.find({}, (err, response) => {
            if (err) throw err;
            res.json(response)
        })
        // res.send("HI")
    })

    // Get one deck
    app.get('/api/deck/:deckId', function(req,res) {
        db.Deck.findOne({'_id': req.params.deckId}, (err, response) => {
            if (err) throw err;

            res.json(response)
        })
    })

    // Get all decks
    app.get('/api/decks', function(req, res) {
        db.Deck.find({})
        .exec((err, result) => {
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

    // Upvote a deck
    // Confirmed working
    app.post('/deck/upvote/:deckId', function(req, res) {
        db.Deck.findOneAndUpdate({ '_id': req.params.deckId}, {$inc: {upvotes: 1}}).exec((res) => {
            console.log(res)
        })
    })

    // Upvote a card
    // Confirmed working
    // ***************** USE CARD ID, NOT MONGO OBJECT ID *****************
    app.post('/card/upvote/:cardId', function(req, res) {
        db.Card.findOneAndUpdate({ 'cardId': req.params.cardId}, {$inc: {upvotes: 1}, $push: {'upvoters': 'guy'}}).exec((err, res) => {
            if (err) throw err;
            console.log(res)
        })
    })

    // downvote a card
    // Confirmed working
    // ***************** USE CARD ID, NOT MONGO OBJECT ID *****************
    app.post('/card/downvote/:cardId', function(req, res) {
        db.Card.findOneAndUpdate({ 'cardId': req.params.cardId}, {$inc: {downvotes: 1}, $push: {'downvoters': 'guy'}}).exec((err, res) => {
            if (err) throw err;
            console.log(res)
        })
    })

    // Signup
    app.post('/signup', passport.authenticate('local-signup'), function(req,res) {
        res.redirect('/');
    });

    // Login
    app.post('/login', passport.authenticate('local-login'), function(req,res) {
        res.redirect('/')
    });

    // Post a new deck
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

    // Upvote an existing deck comment
    app.post('/newdeckcommentupvote', function(req, res) {
        console.log(req.body.commentId)
        db.DeckComment.findOneAndUpdate({ '_id' : req.body.commentId }, {$inc: {upvotes: 1}, $push: {'upvoters': 'guy'}}).exec((result) => {
            console.log(result)
        })    
    })

    // Post a new deck comment
    app.post('/newdeckcomment', function(req, res) {
        db.DeckComment.create({
            user: req.body.user,
            comment: req.body.comment,
            deckId: req.body.deckId,
            date: new Date(),
        })
    })

    // Get all comments for a deck
    app.get('/api/deck/comments', function(req, res) {
        db.DeckComment.find({'deckId': req.body.deckId})
        .exec(result => json(result))
    });

    // Route for posting a new card. Not needed for anything, but since I made it already, left it here.
    app.post('/newcard', function(req, res) {
        db.Card.create({
            artist: req.body.artist,       
            attack: req.body.attack,
            cardId: req.body.cardId,
            cardSet: req.body.cardSet,
            collectible: req.body.collectible,
            cost:req.body.cost,
            dbfId:req.body.dbfId,
            flavor:req.body.flavor,
            health: req.body.health,
            img: req.body.img,
            name:req.body.name,
            playRequirements: req.body.playRequirements,
            playerClass: req.body.playerClass,
            rarity: req.body.rarity,
            text: req.body.text,  
            type: req.body.type
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