var express = require('express');
var router = express.Router();
const db = require("../db/connection");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  db.selectDrinkings(function(err, response) {
    if (err) {
      res.send({
        message: "Success",
        data: response
      });
    } else {
      res.send({
        message: "Success",
        data: response
      });
    }
  });
});

router.get('/specific/:id', function(req, res, next) {
  console.log('respond with a resource', req?.params?.id);
  db.selectDrinkingByUserId(req?.params?.id, function(err, response) {
    if (err) {
      res.send({
        message: "Success",
        data: response
      });
    } else {
      res.send({
        message: "Success",
        data: response
      });
    }
  });
});

router.post('/', function(req, res, next) {
  db.checkUserDrinkingAlready(req?.body?.user_id, function(err, response){
    console.log("res...",response);
  })
      // db.createDrinkingRow(req?.body, function (err, datas) {
      //   if (err) {
      //     res.send({
      //       message: "Success",
      //       data: datas
      //     });
      //   } else {
      //     res.send({
      //       message: "Success",
      //       data: datas
      //     });
      //   }
      // });
});

module.exports = router;
