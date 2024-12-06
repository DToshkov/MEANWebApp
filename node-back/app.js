import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import Post from './model/post.js'

mongoose.connect(process.env.mongoDB)
    .then(() => {
        console.log('MongoDB Connected');

    }).catch(() => {
    console.log('MongoDB failed');
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false})); //used for URL encoding, e.i. Hello%20World%26

//adding header data
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
// app.post('api/posts', (req, res, next) => {
//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content
//     });
//     post.save().then(result => {
//         console.log(result);
//         res.status(201).json({
//                 success: true,
//                 postId: result._id
//             }
//         );
//     });
// });

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

// app.get('api/posts/', (req, res, next) => {
//     Post.find()
//         .then(data => {
//             res.status(200).json({
//                 success: true,
//                 data: data
//             });
//         })
// })
// app.get('api/posts/:id', (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json({post});
//         } else {
//             res.status(404).json({
//                 success: false,
//                 message: 'data not found'
//             });
//         }
//     });
// });
// app.delete('/api/posts/:id', (req, res, next) => {
//     Post.deleteOne({_id: req.params.id}).then(result => {
//         res.status(200).json({success: true});
//     });
// });

export default app;
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
//
// import postRoutes from './routes/post.js';
//
// import Post from './model/post.js'
// //mongodb+srv://dtoshkov:<db_password>@cluster0.crmhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//
// mongoose.connect(process.env.mongoDB)
//     .then( ()=>{
//         console.log('MongoDB Connected');
//
//     }).catch(()=>{
//     console.log('MongoDB failed');
// });
//
//
// const app = express();
//
// app.use(bodyParser.json());
//
// app.use(bodyParser.urlencoded({ extended: false })); // used form URL encoding i.e.  Hello2%World
//
// // adding header data
// // CORS Policy Starts here! allowing usage from UX browser - where you get ping, and type of items sent
// app.use((req, res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*'); // type of requests you can get
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader(
//         'Access-control-Allow-Methods',
//         'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     );
//     next();
//
// });
// app.post('/api/posts', (req, res, next ) => {
//     // const post = req.body;
// // no need for periods on HTTP paths - pinging through HTTP protocol
//     const post = new Post(
//         {
//             title:req.body.title,
//             content:req.body.content,
//         });
//
//     console.log(post);
//     post.save();
//
//     res.status(201).json(
//         {success: true}
//     );
// });
//
//
// app.get('/api/posts', (req, res, next) => {
//     Post.find()
//         .then(data => {
//             console.log('get all:', data);
//             res.status(200).json({
//                 success: true,
//                 data: data
//             });
//         });
// });
//
// export default app;

// MONGODB CLUSTER0
// user name dtoshkov
// password lMhY7uMFLBkKbAIY