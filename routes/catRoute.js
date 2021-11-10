'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  }
};
const upload = multer({dest: './uploads/', fileFilter}); // destination relative to app.js
const {cat_list_get, cat_get, cat_post, cat_put, cat_delete} = require(
    '../controllers/catController');
const {body} = require('express-validator');

router.route('/').
    get(cat_list_get).
    put(cat_put).
    post(upload.single('cat'),
        body('name').not().isEmpty().escape(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        body('owner').isNumeric(),
        cat_post,
    );

router.route('/:id').
    get(cat_get).
    delete(cat_delete);

module.exports = router;