'use strict';

const userModel = require('../models/userModel');

//const cats = catModel.cats; ->
const {users, getUser} = userModel;

const user_list_get = (req, res) => {
    const UsersSansPasswords = users.map((user) => {
        delete user.password;
        return user;
    });
    res.json(UsersSansPasswords);
};

const user_get = (req, res) => {
    const response = getUser(req.params.id);
    delete response.password;
    res.json(response);
};

module.exports = {
    user_list_get,
    user_get,
};