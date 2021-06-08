const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

router.post('/register-post', async (req,res)=>{
    try{
        let objPost = req.body;
        const {username} = objPost;

        const user = await (User.findOne({username}));
        if(!user) return res.send({
            error :'Erro',
            msg : "este username nao existe"
        });

        objPost.user_id = user['_id'];
        const post = await Post.create(objPost)

        return res.send({
            post,
            token : generateToken({ id: user.id })
        }); 
    }catch(err){
        return res.status(400).send({'error': 'Registration failed' + err});
    }
});

router.post('/get-posts-perfil', async (req,res)=>{
    try{
        let objPost = req.body;
        const {user_id} = objPost;

        let posts = await Post.find({user_id: user_id}).sort({ createdAt: -1 });
        return res.send({
            posts
        });
    }catch(err){
        return res.status(400).send({'error': 'Registration failed' + err});
    }
});

router.get('/get-posts', async (req,res)=>{
    try{
        let posts = await Post.find({}).sort({ createdAt: -1 });
        return res.send({
            posts
        });
    }catch(err){
        return res.status(400).send({'error': 'Registration failed' + err});
    }
});

module.exports = app => app.use('/auth', router);