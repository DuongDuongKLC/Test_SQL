const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();
// get trang chu
router.get('/', (req ,res ,next)=>{
    res.render('index');
});
// get sign up
router.get('/sign_up', (req ,res ,next)=>{
    res.render('sign_up');
});
router.get('/sign_in', (req ,res ,next)=>{
    res.render('sign_in');
});

// gui data tu form 
router.post('/login', (req, res, next)=>{
    res.json(req.body);
});
router.post('/register', (req, res, next)=>{
    res.json(req.body);
});
//..................................................
module.exports = router;