'use strict'
const _CONST = require('../database/constant')
const _UTIL = require('../utils/')
const _LOGIN_CON = require('../controllers/Login')
const _USERS_CON = require('../controllers/User')


var self = module.exports = {
    test: (req, res) => {
        return res.status(200).json({status: _CONST.SUCCESS, elements: 'Hello Anh Em'})
    },
    home: async (req, res) => {
        //check session tai day
        console.log('req.session.user>>>', req.session.user);
        // return res.render('home.ejs', {user: req.session.user})
    },
    profile: async (req, res) => {
        // return res.render('profile.ejs', {user: req.session.user})
    },
    login: async (req, res) => {
        // if(req.session.user){
        //     return res.redirect('http://localhost:3001/profile?step=session')
        // }
        // if(req.method === 'GET'){
        //     return res.render('login.ejs')
        // }

        if(req.method === 'POST'){
            //su dung Util check missing key neu can
            let q = req.body;
            let check = _UTIL.checkMissingKey(q, ['email', 'password'])
            console.log('check>>>>', check)
            if(q.TYPE === 'RE'){
                console.log('user >>> register');
                let rsLogin = await _LOGIN_CON.function_register(q)
                if(rsLogin){
                    let rsUser = await _USERS_CON.function_register_users(q);
                    if(rsUser){
                        res.json({
                            result: "successed",
                            data: rsUser,
                            message: "Success",
                        });
                    }
                }

                return res.json({
                    result: "failed",
                    message: "failed",
                });
            }

            //xu ly cho login

            if(q.TYPE === 'LO'){
                console.log(q)
                let objLogin = await _LOGIN_CON.function_login(q)
                if(objLogin){
                    //storage session here
                    console.log('123')
                    return res.json({
                            result: "successed",
                            data: objLogin,
                            message: "Success",
                        });
                }
                return res.json({
                        result: "failed",
                        message: "failed",
                    });
            }
        }
       
    },
}