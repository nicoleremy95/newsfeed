// var express = require('express');
// var db = require('../models');
// var router = express.Router();


// //NEWS ROUTES '/api/news'
//   //Get all news in database, PASSED POSTMAN TEST: PASSED
//   router.get('/', (req, res) =>{
//     db.News.find({})
//     .then((allNews) =>{
//         res.json(allNews);
//     })
//     .catch((err) =>{
//         console.log('err', err);
//         res.status(500).end();
//     });
//   })

//   //Add news to the database, PASSED POSTMAN TEST: PASSED
//   router.post('/news', (req, res) =>{
//     db.News.create({
//         newsData: req.body.newsData,
//         newsCreator: req.body.newsCreator
//     })
//     .then((newNews) =>{
//         res.json(newNews);
//     })
//     .catch((err) =>{
//         console.log('err', err);
//         res.status(500).end();
//     })
//   })

//   //Add comment to news, PASSWED POSTMAN TEST: PASSED
//   router.post('/comment/:newsId',(req, res) =>{
//     db.News.findOne({
//       _id: req.params.newsId
//     })
//     .then(news =>{
//       news.comments.push({
//         message: req.body.message
//       })
//       news.save();
//       res.json(news)
//     })
//     .catch((err) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//   })

//   //Add reaction to news, PASSED POSTMAN TEST: PASSED 
//   router.post('/reaction/:newsId', (req, res) =>{
//     db.News.findOne({
//       _id: req.params.newsId
//     })
//     .then(news =>{
//       news.reactions.push({
//         reaction: req.body.reaction
//       })
//       news.save();
//       res.json(news)
//     })
//     .catch((err) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//   })

//   //Update news in the database, PASSED POSTMAN TEST: PASSED
//   router.put('/news/:newsId', (req, res) =>{
//     db.News.findOne({
//       _id: req.params.newsId
//     }) 
//     .then((news) =>{
//       if(!news) {
//         res.status(404).send('data not found');
//       } else {
//       news.newsData = req.body.newsData;
//       news.save()
//       .then(news =>{
//         res.json(news)
//       })
//       .catch((err) =>{
//         console.log('err', err)
//         res.status(500).end();
//       })
//       }
//     })
//     .catch((err) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//   })

//   //Delete news in database, PASSED POSTMAN TEST: PASSED
//   router.delete('/news/:newsId', (req, res) =>{
//     db.News.findOne({
//       _id: req.params.newsId
//     })
//     .then((news) =>{
//       if(!news) {
//         res.status(404).send('data not found');
//       } else {
//         news.deleteOne()
//         .then(news =>{
//           res.json(news)
//         })
//         .catch((err) =>{
//           console.log('err', err)
//           res.status(500).end();
//         })
//       }
//     })
//   })

// module.exports = router;