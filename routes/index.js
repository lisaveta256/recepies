var express = require('express');
var router = express.Router();
const db = require('../models');
const Cleaning = db.cleaning;

/* GET home page. */
router.get('/:url?', function(req, res, next) {
  let url;
  if(req.params.url){
    url = req.params.url;
  }else{
    url = 1;
  }
  Cleaning.findOne({ where: {id: url} })
  .then(data=>{
     res.render('index', { name: data.name });
  })

 
});

module.exports = router;
