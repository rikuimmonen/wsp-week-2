'use strict';

const userModel = require('../models/userModel');
const {httpError} = require('../utils/errors');
const {getAllUsers, getUser} = userModel;

const user_list_get = async (req, res, next) => {
  try {
    const users = await getAllUsers(next);
    if (users.length > 0) {
      res.json(users);
    } else {
      next(httpError('No users found', 404));
    }
  } catch (e) {
    console.log('user_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const user_get = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id, next);
    if (user.length > 0) {
      res.json(user.pop());
    } else {
      next(httpError('No user found', 404));
    }
  } catch (e) {
    console.log('user_get error', e.message);
    next(httpError('internal server error', 500));
  }
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