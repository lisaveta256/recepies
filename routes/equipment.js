var express = require('express');
var router = express.Router();
const db = require("../models");
const Op = db.Sequelize.Op;
const Cleaning = db.cleaning;
const Layer = db.layer;
const Gas = db.gas;
const Process = db.process;


router.get('/', function(req, res, next) {
  Cleaning.findAll()
  .then(dataCleaning=>{
    Layer.findAll()
    .then(dataLayer=>{
      Gas.findAll()
      .then(dataGas=>{
        Process.findAll()
        .then(dataProcess=>{
          db.sequelize
          .query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'recepies'`, { raw: true })
          .then(data=>{
                  res.render('equipment',{
                  dataCleaning,
                  dataLayer,
                  dataGas,
                  dataProcess,
                  tables: data[0]
                })
            }); 


        })
        
      })
    })
  });

    // const quer = db.sequelize
    // .query("SELECT * FROM `cleanings`", { raw: true })
    // .then(data=>{
    //   //    console.log('quer--------------', data)
      
        
    // })
  //   db.sequelize
  //   .query("SHOW COLUMNS FROM `processes`", { raw: true })
  //   .then(data=>{
  // //   console.log('columns--------------', data)
  //   Object.keys(data[0]).forEach(key=>{
  //       // console.log('key--------------', key, data[0][key].Field)
  //   })
     
      
        
  //  })



     
});
router.get('/filter', function(req, res, next) {
  var name,source_col='name', columnName="name", table, nameCondition="", sort, sortCondition="";
  if(req.query.source_col!=''){
    source_col = req.query.source_col;
  }
  if(req.query.col_sort!=''){
    columnName = req.query.col_sort;
  }
  if( (req.query.sort!='') && (req.query.sort!='no') ){
    sort = req.query.sort;
    sortCondition = ' ORDER BY '+columnName+' '+sort;
  }
  if(req.query.filter_abc!=''){
    name = req.query.filter_abc;
    nameCondition = 'AND '+source_col+' LIKE "%'+name+'%"';
 //   var condition =  { 'name': { [Op.like]: '%'+name+'%' }};
  }
  table = req.query.table_choice;
  db.sequelize
    .query("SELECT * FROM `"+table+"` WHERE id>0 "+ nameCondition + sortCondition, { raw: true })
    .then(data=>{
      res.json(data[0]);
      /*
      Object.keys(data).forEach(key=>{
        res.write('<tr class="'+table+'">');
        res.write('<td>');
        res.write(key);
        res.write('</td>');
        res.write('<td>');   
        res.write(key.name);
        res.write('</td>');        
        res.write('</tr>');
      })*/
    //  res.end();
//      console.log('filter---------', data)
    })
 // Process.findAll({ where: condition })

//console.log('query---------', req.query)

});

module.exports = router;
