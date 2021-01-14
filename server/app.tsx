//TODO: convert app.js -> app.tsx
// import * as createError from 'http-errors';
// import * as express from 'express';
// import {Request, Response} from 'express'
// import * as session from 'express-session';
// import * as cookieParser from 'cookie-parser';
// import * as mongoose from 'mongoose';
// import * as cors from "cors";

// // export interface Request extends Express.Request {
// //   session: any[];
// //  }
// //sesions 
// import { SessionData, Store, MemoryStore, Session } from 'express-session';

// //password encryption
// import * as bcrypt from 'bcrypt'; 

// //Middleware similar to cors
// const logger = require('morgan');

// //Express with port 
// const app = express();
// const port = 8080;

// //Models
// //UNCOMMENT FOR PROPER FILE STRUCTURE
// // const models = require('./models');
// // TEMPORARY
// const db = require('./models');

// //TODO: uncomment for proper file structure
// //API Routes 
// // const allRoutes = require('./controllers');

// //Define middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.set('view engine', 'html');

// // CORS
// // Uncomment for development
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     // origin: "https://travelplanit.herokuapp.com",
//     credentials: true,
//   })
// );

// //SESSION
// // for heroku deploy uncomment proxy, samesite and secure
// app.use(
//   session({
//     secret: "sup app",
//     resave: false,
//     saveUninitialized: true,
//     // proxy: true,
//     cookie: {
//       maxAge: 2 * 60 * 60 * 1000,
//       // sameSite: "none",
//       // secure: true,
//     },
//   })
// );

// declare module 'express-session' {
//   interface SessionData {
//       user: any;
//       news: any
//   }
// }
// //NEWS ROUTES ** DELETE WHEN FILE STRUCTURE WORKS  
//   //Get all news in database, PASSED POSTMAN TEST: PASSED
//   app.get('/news', (req:Request, res:Response) =>{
//     db.News.find({})
//     .then((allNews:any) =>{
//         res.json(allNews);
//     })
//     .catch((err:object) =>{
//         console.log('err', err);
//         res.status(500).end();
//     });
//   })

//   //Add news to the database, PASSED POSTMAN TEST: PASSED
//   app.post('/news', (req:Request, res:Response) =>{
//     if (!req.session.user) {
//       res.status(401).send("login required")
//     } else {
//     db.News.create({
//         newsData: req.body.newsData,
//         userId: req.session.user.id
//     })
//     .then((newNews) =>{
//         res.json(newNews);
//     })
//     .catch((err:object) =>{
//         console.log('err', err);
//         res.status(500).end();
//     })
//     }
//   })

//   //Add comment to news, PASSWED POSTMAN TEST: PASSED
//   app.post('/comment/:newsId',(req:Request, res:Response) =>{
//     if(!req.session.user){
//       res.status(401).send("login required")
//     } else {

    
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
//     .catch((err: object) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//   }
//   })

//   //Add reaction to news, PASSED POSTMAN TEST: PASSED 
//   app.post('/reaction/:newsId', (req:Request, res:Response) =>{
//     if (!req.session.user) {
//       res.status(401).send("login required")
//     } else {
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
//     .catch((err:object) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//     }
//   })

//   //Update news in the database, PASSED POSTMAN TEST: PASSED
//   app.put('/news/:newsId', (req:Request, res:Response) =>{
//     if (!req.session.user) {
//       res.status(401).send("login required")
//     } else {
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
//     .catch((err:object) =>{
//       console.log('err', err)
//       res.status(500).end();
//     })
//     }
//   })

//   //Delete news in database, PASSED POSTMAN TEST: PASSED
//   app.delete('/news/:newsId', (req:Request, res:Response) =>{
//     if (!req.session.user) {
//       res.status(401).send("login required")
//     } else {
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
//         .catch((err:object) =>{
//           console.log('err', err)
//           res.status(500).end();
//         })
//       }
//     })
//     }
//   })

//   //AUTH ROUTES ** DELETE WHEN FILE STRUCTURE WORKS 
//   //Get all users, PASSED POSTMAN TEST: PASSED 
//   app.get("/users", (req:Request, res:Response) => {
//     db.User.find({})
//       .then((allUsers) => {
//         res.json(allUsers);
//       })
//       .catch((err:object) => {
//         console.log(err);
//         res.status(500).end();
//       });
//   });

//   //Sign up, PASSED POSTMAN TEST: PASSED
//   app.post('/signup', (req:Request, res:Response) =>{
//     console.log('req', req);
//     db.User.create(
//         {
//             username:req.body.username,
//             email: req.body.email,
//             password:req.body.password,
//             name: {
//                 first: req.body.name ? req.body.name.first : '',
//                 last : req.body.name ? req.body.name.last : ''
//             }
//         })
//         .then(user=>{
//           res.json(user)
//         })
//         .catch((err:object) =>{
//           console.log('err', err)
//           res.status(500).end();
//         })
//   })

//   //login, PASSED POSTMAN TEST: PASSED 
//   app.post("/login", (req:Request, res:Response) => {
//     db.User.findOne({
//       username: req.body.username,
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send("no such user");
//       } else {
//         console.log('console user', user);
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//           req.session.user = {
//             id: user._id,
//             username: user.username,
//             email: user.email
//           };
//           res.send(req.session);
//         } else {
//           res.status(401).send("wrong password");
//         }
//       }
//     })
//     .catch((err:object) => {
//       console.log(err)
//       res.status(500).end();
//     });
//   });
  
//   //Log out, PASSED POSTMAN TEST: PASSED 
//   // app.get('/logout', (req:Request, res:Response) =>{
//   //   console.log('console req', req)
//   //   req.session.destroy();
//   //   res.send("You have been logged out");
//   // })

//   //read session, PASSED POSTMAN TEST: PASSED 
//   app.get('/readsession', (req:Request, res:Response) =>{
//     console.log('req.session.user', req.session.user)
//     res.json(req.session)
//   })

// // catch 404 and forward to error handler
// app.use(function (req:Request, res:Response, next) {
//   next(createError(404));
  
// });

// // error handler
// app.use(function (err, req:Request, res:Response, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: err,
//   });
// });

// //Connect to MongoDB local host
// mongoose.connect('mongodb://127.0.0.1:27017/news', 
//   { useNewUrlParser: true, 
//     useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
//   }
// );
// const connection = mongoose.connection;
// connection.once('open', function(){
//   console.log('MongoDB database connection established success')
// })


// //TODO: separate files
// //Use routes
// // app.use('/', allRoutes);

// //Initialize server
// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });
// module.exports = app;
