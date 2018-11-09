var express = require('express');
var PORT = 300 + process.env.NODE_APP_INSTANCE;

var app = express();


if (process.env.NODE_APP_INSTANCE == 0) {
  console.log('##############################');
  console.log('PM2 CLUSTER MODE');
  console.log('Modulos: '+ process.env.MODULES);
  console.log('Versao Node: '+ process.env.NODE_VERSION);
  console.log('##############################');
}

app.get('/', function (req, res){
  res.send('Access: ' + PORT);
  console.log('NodeJS Cluster:'+ PORT);
  // console.log(process.env);
});


app.listen(PORT);
