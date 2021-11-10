'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();
const {httpError} = require('../utils/errors');

const getAllCats = async (next) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('getAllCats error', e.message);
    next(httpError('Database error', 500));
  }
};

const getCat = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id WHERE cat_id = ?',
        [id]);
    return rows;
  } catch (e) {
    console.error('getCat error', e.message);
    next(httpError('Database error', 500));
  }
};

const addCat = async (name, weight, owner, filename, birthdate, next) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)',
        [name, weight, owner, filename, birthdate]);
    return rows;
  } catch (e) {
    console.error('addCat error', e.message);
    next(httpError('Database error', 500));
  }
};

const modifyCat = async (id, name, weight, owner, birthdate, next) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?',
        [name, weight, owner, birthdate, id]);
    return rows;
  } catch (e) {
    console.error('editCat error', e.message);
    next(httpError('Database error', 500));
  }
};

const deleteCat = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM wop_cat WHERE cat_id = ?',
        [id]);
    return rows;
  } catch (e) {
    console.error('deleteCat error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  modifyCat,
  deleteCat,
};
