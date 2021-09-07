var express = require('express');
var router = express.Router();
var db = require('../models');
var Gas = db.gas;

/* GET home page. */
router.post('/edit/:url', function(req, res, next) {
     let url;
     if(req.params.url){
          url = req.params.url;
          Gas.update(req.body, {where: {id: url} })
          .then(()=>{
               res.redirect('/gas/'+url)
          })
     }else{
          res.render('error');
     }     
});

router.get('/:url?', function(req, res, next) {
     let url;
     if(req.params.url!=null){
          url = req.params.url;
     }else{
          url = '1';
     }
     Gas.findAll()
     .then(data=>{
          Gas.findOne({where: {id:url} })
          .then(dataOne=>{
               res.render('gas', {
                    data,
                    dataOne
               });
          })
     })
     
});

module.exports = router;
