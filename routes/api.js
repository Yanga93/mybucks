const express = require('express');
const router = express.Router();

//get a list of delays per second from the json file
router.get('/delays', function(req, res){
  res.send({type: 'GET'});
});

module.exports.router = router;
