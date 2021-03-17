var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

console.log("Hello world");

absPath = __dirname + '/views/index.html';

app.get("/",function(req, res){
    res.sendFile(absPath);
})

app.use(bodyParser.urlencoded({ extended: false}));

app.use("/", function(req, res, next){
    console.log("middle ware function");
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use("/public", express.static(`${__dirname}/public/`));

app.get("/json", function(req, res){
    // console.log(`process.env.MESSAGE_STYLE: ${process.env.MESSAGE_STYLE}`);
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message":"JSON DERULO"})
    } else {
        res.json({"message":"JSON Derulo"})
    }
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({"time":req.time})
})

app.get("/:word/echo", function(req, res){
    res.json({"echo": req.params.word});
})


// app.get("/name", function(req, res){
//     console.log(req);
//     res.json({"name":`${req.query.first} ${req.query.last}`});
// })

app.route("/name")
.get(function(req, res){
    console.log(req);
    res.json({"name":`${req.query.first} ${req.query.last}`});
})
.post(function(req, res){
    res.json({"name":`${req.body.first} ${req.body.last}`});
})
    



































 module.exports = app;
