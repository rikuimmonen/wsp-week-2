'use strict';

const {getAllCats, getCat, addCat, modifyCat, deleteCat} = require('../models/catModel');
const {httpError} = require('../utils/errors');

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
  try {
    const {name, birthdate, weight, owner} = req.body;
    const cat = req.file.filename;
    const result = await addCat(name, weight, owner, cat, birthdate, next);
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
    const {name, birthdate, weight, owner, id} = req.body;
    const result = await modifyCat(id, name, weight, owner, birthdate, next);
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
    const result = await deleteCat(req.params.id, next);
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
  cat_delete
};