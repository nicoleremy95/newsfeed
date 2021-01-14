// var express = require('express');
// var router = express.Router();
// var db = require('../models');

// //AUTH ROUTES '/api/auth'
// //Sign Up, PASSED POSTMAN TEST: PENDING 
// router.post('/signup', (req, res) =>{
//     const {username, email, password, name} = req.body;
//     db.User.create(
//         {
//             username:username,
//             email: email,
//             password:password,
//             name: {
//                 first: name ? name.first : '',
//                 last : name ? name.last : ''
//             }
//         }
//         .then(user=>{

//         })
//     )
// })

// //Login, PASSED POSTMAN TEST: PENDING
// router.post('/login', (req, res) =>{
//     db.User.findOne({
//         username: req.body.username
//     })
//     .then(user =>{
//         if(!user) return res.status(404).send("user not found");
//         else {
            
//         }
//     })
// })

// //Logout, PASSED POSTMAN TEST: PENDING
// //Logout
// router.get('/logout', (req, res) =>{
//     // req.session.destroy();
//     res.send(`${req.body.username} logged out`)
// })
// module.exports = router;