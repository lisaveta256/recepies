var express = require('express');
var router = express.Router();
var db = require('../models');
var Layer = db.layer;

router.post('/edit/:url', function(req, res, next) {
     let url;
     if(req.params.url){
          url=req.params.url;
          Layer.update(req.body, { where: {id: url} })
          .then(()=>{
               res.redirect('/layer/'+url)
          })
     }else{
          res.render('error')
     }
});
router.get('/delete/:url', function(req, res, next) {
     let url;
     if(req.params.url){
          url=req.params.url;
          Layer.destroy({ where: {id: url} })
          .then(()=>{
               res.redirect('/layer/')
          })
     }else{
          res.render('error')
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
     Layer.findAll()
     .then((dataAll)=>{
          Layer.findOne({ where: {id: url} })
          .then((data)=>{
               res.render('layer', {
                 dataAll,
                 data   
               })
               
          })
     })
});

module.exports = router;
