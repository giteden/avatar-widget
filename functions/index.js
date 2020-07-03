const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


const handleAvatarReq = (req, res) => {

 const avatars = new Map([
     ['10000', 'https://res.cloudinary.com/blog-assets/image/upload/v1593694626/100000_y0mjk7.png'],
     ['20000', 'https://res.cloudinary.com/blog-assets/image/upload/v1593694626/200000_wikrif.png'],
     ['30000', 'https://res.cloudinary.com/blog-assets/image/upload/v1593694954/generic_man_eu69gf.png'],
     ['40000', 'https://res.cloudinary.com/blog-assets/image/upload/v1593694966/generic_woman_vxlzsk.png']
 ])
 const avatarId =  req.query.userid;
 const avatarImg = avatars.get(avatarId);
 res.json({avatarImg});
};

app.get('/', (req , res) => {
    
    handleAvatarReq(req, res);
    
})

exports.useravatar = functions.https.onRequest(app);