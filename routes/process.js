var express = require('express');
var router = express.Router();
const db = require('../models');
const Process = db.process;
const Cleaning = db.cleaning;

const Op = db.Sequelize.Op;
/*
const title = req.query.title;
  var condition = title ? { title: { [Op.like]: %${title}% } } : null;

  Process.findAll({ where: condition })*/


router.get('/', function(req, res, next) {
    let processData, cleaningData;
    Process.findAll()
    .then(data=>{
      processData = data;
     Cleaning.findAll()
      .then(cleaningData=>{
        cleaningData = cleaningData
        //console.log('cleaning', cleaningData)
        //console.log('process', processData)
         res.render('processes', {
          data: processData,
          cleaningData : cleaningData
    })
      })
      
    })
    
  });
  router.get('/:url', function(req, res, next) {
    let url;
    if(req.params.url){
      url = req.params.url;
    }else{
      url = 1;
    }
    Process.findOne({where: {id: url} })
    .then(data=>{
      Process.findAll()
      .then(dataAll=>{
        res.render('process', {
        item:data,
        all: dataAll
    })
      }

      )
      
    })
    
  });

  router.post('/edit/:url', function(req, res, next) {
    let url;
    if(req.params.url){
      url = req.params.url;
      //console.log(req.body);
      Process.update(req.body,{where: {id:url} })
      .then(()=>{
        res.redirect('/process')
      })
    }else{
      res.render('error');
    }
  });

  router.get('/delete/:url', function(req, res, next) {
    let url;
    if(req.params.url){
      url = req.params.url;
      //console.log(req.body);
      Process.destroy({where: {id:url} })
      .then(()=>{
        res.redirect('/process')
      })
    }else{
      res.render('error');
    }
  });
  router.post('/add', function(req, res, next) {
    if(req.body.name!=''){
      Cleaning.findOne({where: {id: req.body.cleaning} })
      .then(data=>{
        if(data==null){
          console.log('Error-----------------')
          res.end('error');
        }else{
          const body = {
            name : req.body.name,
            cleaning: req.body.cleaning,
            layer: req.body.layer,
            gas: req.body.gas,
            time: req.body.time
          }
          Process.create(body);
          res.redirect('/process');
        }
        
      })
    }else{
      res.redirect('/process');
    }
      
  
  });

module.exports = router;