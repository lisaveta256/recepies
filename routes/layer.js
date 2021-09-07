var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:url?', function(req, res, next) {
     res.render('layer')
});

module.exports = router;
