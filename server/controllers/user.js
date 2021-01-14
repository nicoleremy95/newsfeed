// var express = require('express');
// var router = express.Router();
// var db = require('../models');

// //USER ROUTES '/api/users'
// //Get all users in database: PASSED POSTMAN TEST: PENDING
// router.get('/', (req, res) =>{
//     db.User.find({})
//     .then((allUsers) =>{
//         res.json(allNews);
//     })
//     .catch((err) =>{
//         console.log('err', err)
//         res.status(500).end();
//     })
// })

// //Get a single user by username in database: PASSED POSTMAN TEST: PENDING
// router.get('/:username', (req,res) =>{
//     db.User.findOne({
//         username: req.params.username
//     })
//     .populate('createdNews')
//     .exec()
//     .then(user =>{
//         res.json(user);
//     })
//     .catch(err =>{
//         console.log('err', err)
//         res.status(500).end();
//     })
// })

// //Get a single user by name in database: PASSED POSTMAN TEST: PENDING
// router.get('/:name', (req, res) =>{
//     db.User.findOne({
//         name: req.body.name
//     })
//     .populate('createdNews')
//     .exec()
//     .then(user =>{
//         res.json(user);
//     })
//     .catch(err=>{
//         console.log('err', err)
//         res.status(500).end();
//     })
// })

// module.exports = router;