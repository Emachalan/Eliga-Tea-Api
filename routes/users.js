var express = require('express');
var router = express.Router();
const db = require("../db/connection");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  db.selectUsers(function(err, response) {
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
      db.createUserRow(req?.body, function (err, datas) {
        if (err) {
          res.send({
            message: "Success",
            data: datas
          });
        } else {
          res.send({
            message: "Success",
            data: datas
          });
        }
      });
});

module.exports = router;
