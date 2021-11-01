'use strict';

const express = require('express');
const router = express.Router();
const {user_list_get, user_get, user_post} = require(
    '../controllers/userController');

router.get('/', user_list_get);
router.get('/:id', user_get);
router.post('/', user_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;