'use strict';

const {getAllCats, getCat, addCat, modifyCat, deleteCat} = require(
    '../models/catModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res, next) => {
  try {
    const cats = await getAllCats(next);
    if (cats.length > 0) {
      res.json(cats);
    } else {
      next(httpError('No cats found', 404));
    }
  } catch (e) {
    console.log('cat_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_get = async (req, res, next) => {
  try {
    const cat = await getCat(req.params.id, next);
    if (cat.length > 0) {
      res.json(cat.pop());
    } else {
      next(httpError('No cat found', 404));
    }
  } catch (e) {
    console.log('cat_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_post = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('cat_post validation', errors.array());
    next(httpError('invalid data', 400));
    return;
  }

  if (!req.file) {
    const err = httpError('file not valid', 400);
    next(err);
    return;
  }

  try {
    const {name, birthdate, weight} = req.body;
    const cat = req.file.filename;
    const result = await addCat(name, weight, req.user.user_id, cat, birthdate,
        next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat added',
        cat_id: result.insertId,
      });
    } else {
      next(httpError('No cat inserted', 400));
    }
  } catch (e) {
    console.log('cat_post error', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_put = async (req, res, next) => {
  try {
    const {name, birthdate, weight} = req.body;
    let owner = req.user.user_id;

    if (req.user.role === 0) {
      owner = req.body.owner;
    }

    const result = await modifyCat(req.params.id, name, weight,
        owner, req.user.role, birthdate, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat edited',
        cat_id: result.insertId,
      });
    } else {
      next(httpError('No cat edited', 400));
    }
  } catch (e) {
    console.log('cat_edit error', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_delete = async (req, res, next) => {
  try {
    const result = await deleteCat(req.params.id, req.user.user_id,
        req.user.role, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat deleted',
        cat_id: result.insertId,
      });
    } else {
      next(httpError('No cat found', 400));
    }
  } catch (e) {
    console.log('cat_delete error', e.message);
    next(httpError('internal server error', 500));
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
  cat_delete,
};