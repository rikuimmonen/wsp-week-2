'use strict';

const catModel = require('../models/catModel');

//const cats = catModel.cats; ->
const {getAllCats, getCat} = catModel;

const cat_list_get = async (req, res) => {
  const cats = await getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const cat = await getCat(req.params.id);
  res.json(cat);
};

const cat_post = (req, res) => {
  console.log(req.body, req.file);
  res.send('With this endpoint you can add cats.');
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};