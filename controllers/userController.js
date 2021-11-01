'use strict';

const userModel = require('../models/userModel');

//const cats = catModel.cats; ->
const {users, getUser} = userModel;

const user_list_get = (req, res) => {
    res.json(users);
};

const user_get = (req, res) => {
    const vastaus = getUser(req.params.id);
    res.json(vastaus);
};

module.exports = {
    user_list_get,
    user_get,
};