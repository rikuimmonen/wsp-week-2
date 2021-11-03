const pool = require('../database/db');
const promisePool = pool.promise();
const {httpError} = require('../utils/errors');

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('getAllUsers error', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
};
