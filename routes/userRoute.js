'use strict';

const express = require('express');
const router = express.Router();
const {user_list_get, user_get} = require("../controllers/userController");

router.get('/', user_list_get);

router.get('/:id', user_get);

router.post('/', (req, res) => {
    res.send('With this endpoint you can add cats.')
});

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.')
});

router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats')
});

module.exports = router;