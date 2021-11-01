'use strict';

const express = require('express');
const router = express.Router();
const {cat_list_get, cat_get} = require('../controllers/catController');

router.get('/', cat_list_get);

router.get('/:id', cat_get);

router.post('/', (req, res) => {
  res.send('With this endpoint you can add cats.');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit cats.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats.');
});

module.exports = router;