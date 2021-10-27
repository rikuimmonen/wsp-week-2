'use strict';

const catModel = require('../models/catModel');

//const cats = catModel.cats;
const {cats} = catModel;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const cat_get = (req, res) => {
  // lähetä yksi kissa
  res.json({});
};

module.exports = {
    cat_list_get,
};