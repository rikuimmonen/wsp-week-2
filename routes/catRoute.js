'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'}); // destination relative to app.js
const {cat_list_get, cat_get, cat_post, cat_put, cat_delete} = require(
    '../controllers/catController');

router.route('/').
    get(cat_list_get).
    put(cat_put).
    post(upload.single('cat'), cat_post);

router.route('/:id').
    get(cat_get).
    delete(cat_delete);

module.exports = router;