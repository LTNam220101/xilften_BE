'use strict'
const _CONST = require('../database/constant')
const login_model = require('../models/login')
const user_model = require('../models/user')
const md5 = require('md5');

var self = module.exports = {
    function_register: async(obj) => {
        //insert vao login collection
        const _obj = {
            email: obj.email,
            password: md5(obj.password),
        }
        return login_model.create(_obj);
    },
    function_login: async(obj, res) => {
        return await user_model.findOne({email: obj.email})
    },
}