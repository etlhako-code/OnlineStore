require('dotenv').config();
var http = require('http'),https=require('https');
const express = require('express'), app=express();

//imports
var cors = require('cors');

app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());
global.basePath = "api/v1/";
app.use(basePath+"/",)



http.createServer(app).listen(3000,()=>{

});
https.createServer(app).listen(4400,()=>{

})