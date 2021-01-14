//TODO: convert User.js -> User.tsx
// import * as mongoose from 'mongoose';
// import { Schema } from "mongoose";
// // const mongoose: any = require('mongoose');
// // import {Schema, Document} from 'mongoose';
// // var Schema: any = mongoose.Schema

// // var mongoose: any = require('mongoose');
// // var Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

// declare interface IUser extends Document {
// // declare interface IUser extends mongoose.Document {
//     username: string;
//     email: string;
//     password: string;
//     name: {
//         first: string,
//         last: string
//     };
// }

// const UserSchema: Schema = new Schema (
//     {
//         username: {
//             type: String,
//             required: true,
//             // unique: true
//         },
//         email: {
//             type: String,
//             // required: true
//         },
//         password: {
//             type: String,
//             // required: true
//         },
//         name: {
//             first: {
//                 type: String,
//                 // required: true
//             },
//             last: {
//                 type: String,
//             }
//         },
//         // createdNews: {
//         //     type: Schema.Types.ObjectId,
//         //     ref: 'News'
//         // },
//         // image: [],   
//     }, {timestamps: true}
// )

// //encrypt password before adding to database
// UserSchema.pre("save", function (next) {
//     const user = this;
//     if (!user.isModified("password")) return next();
//     bcrypt.genSalt(10, function (err: any, salt: any) {
//       if (err) return next(err);
  
//       bcrypt.hash(user.password, salt, function (err: any, hash: any) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
// });


// module.exports = mongoose.model<IUser>('User', UserSchema)



