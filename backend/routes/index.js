var express = require('express');
var router = express.Router();
//var cors = require('cors')
//app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
 // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  //res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
