var express = require('express');
var router = express.Router();
var userController = require('../models/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:tagid', function (req, res, next) {
  var tagid = req.params.tagid;
  userController.getUser(tagid, function (result) {
    if(result.success){

    }
  })
})

module.exports = router;
