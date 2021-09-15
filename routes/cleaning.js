var express = require('express');
var router = express.Router();
const db = require('../models');
const Cleaning = db.cleaning;

router.post('/edit/:url', function(req, res, next) {
  let url;
  if(req.params.url){
    url=req.params.url;
    Cleaning.update(req.body,{where: {id:url}})
    .then(()=>{
    res.redirect('/cleaning/'+url);   
    });
  }else{
    res.render('error');
  }
});
router.get('/delete/:url', function(req, res, next) {
  let url;
  if(req.params.url){
    url=req.params.url;
    Cleaning.destroy({where: {id:url}})
    .then(()=>{
    res.redirect('/cleaning/');   
    });
  }else{
    res.render('error');
  }
});
/* GET home page. */
router.get('/:url?', function(req, res, next) {
  let url;
  if(req.params.url){
    url = req.params.url;
  }else{
    url = 1;
  }
  Cleaning.findAll()
  .then(dataAll=>{
      Cleaning.findOne({ where: {id: url} })
      .then(data=>{
        //console.log('data', data)
        res.render('cleaning', { 
          dataAll,
          data});
      });
  });
});


module.exports = router;
