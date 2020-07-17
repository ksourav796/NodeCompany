const express = require('express');
const Product = require('../core/product');


const router = express.Router();
const product = new Product();


router.get('/', (req, res, next) => {
    let user = req.session.user;
    
    if(user) {
        res.redirect('/home');
        return;
    }
   
    res.render('index', {title:"My application"});
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});




router.post('/product', (req, res, next) => {
    
    let productInput = {
        name: req.body.name,
        email: req.body.email,
         message: req.body.message
    };
    
    product.create(productInput, function(lastId) {
       
        if(lastId) {
            
            product.find(lastId, function(result) {
                req.session.product = result;
                req.session.opp = 0;
                res.redirect('/');
            });

        }else {
            console.log('Error creating a new Product ...');
        }
    });

});

module.exports = router;