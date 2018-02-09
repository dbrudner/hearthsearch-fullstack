// app/routes.js
var path = require('path')

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/myprofile', isLoggedIn, function(req, res) {
        

        res.json(req.user)
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
    });

    
      

    app.get('/test', function(req, res) {
        res.json(req.user)
    })

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        failureFlash : true // allow flash messages
    }));

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