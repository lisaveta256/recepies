var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/table', function(req, res, next) {
 // res.json(req.query)   
    tableName = req.query.name;
    const quer = db.sequelize
    .query("SHOW COLUMNS FROM `"+tableName+"`", { raw: true })
    .then(data=>{
        Object.keys(data[0]).forEach(key=>{
            res.write('<option value='+data[0][key].Field+'>');
            res.write(data[0][key].Field);
            res.write('</option>');
        })
    res.end();
    })

  });

  module.exports = router;