'use strict';

const express = require('express');
const router = express.Router();
const {user_list_get, user_get, user_post} = require(
    '../controllers/userController');
const {body} = require('express-validator');

router.get('/', user_list_get);
router.get('/:id', user_get);
router.post(
    '/',
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[a-zA-Z]).{8,}'),
    user_post,
);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;