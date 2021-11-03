'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.query(
        'SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
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
