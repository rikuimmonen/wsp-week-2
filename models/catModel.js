'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();
const {httpError} = require('../utils/errors');

const getAllCats = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('getAllCats error', e.message);
    next(httpError('Database error', 500));
  }
};

const getCat = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('getCat error', e.message);
    next(httpError('Database error', 500));
  }
};

/*
const getCat = (id) => {
  return cats.find((cat) => cat.id === id);
};
*/

module.exports = {
  getAllCats,
  getCat,
};
