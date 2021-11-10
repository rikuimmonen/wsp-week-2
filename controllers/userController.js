'use strict';

const {getAllUsers, getUser, addUser} = require('../models/userModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

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
    next(httpError('Internal server error', 500));
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
    next(httpError('Internal server error', 500));
  }
};

const user_post = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user_post validation', errors.array());
    next(httpError('invalid data', 400));
    return;
  }

  try {
    const {name, email, passwd} = req.body;
    const result = await addUser(name, email, passwd, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'user added',
        user_id: result.insertId,
      });
    } else {
      next(httpError('No user inserted', 400));
    }
  } catch (e) {
    console.log('user_post error', e.message);
    next(httpError('Internal server error', 500));
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
};