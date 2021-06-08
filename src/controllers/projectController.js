const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

router.use(authMiddleware);

router.get('/', (req, res)=>{
    res.send({ok:true, user: req.userid});
})

module.exports = app => app.use('/projects', router);