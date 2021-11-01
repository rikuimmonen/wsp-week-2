'use strict';

const catModel = require('../models/catModel');

//const cats = catModel.cats; ->
const {cats, getCat} = catModel;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const cat_get = (req, res) => {
    const vastaus = getCat(req.params.id);
    res.json(vastaus);
};

module.exports = {
    cat_list_get,
    cat_get,
};