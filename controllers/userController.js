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

const user_post = (req, res) => {
  console.log(req.body);
  res.send('With this endpoint you can add users.');
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
};