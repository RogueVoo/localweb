var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	https = require('https')

var privateKey = fs.readFileSync( __dirname + path.sep + '.ssh/server.key')
var certificate = fs.readFileSync( __dirname + path.sep + '.ssh/server.crt')
var port = 443

var app = express() //express.createServer({key: privateKey, cert: certificate},express())
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var dir = path.resolve(process.argv[2])

if(dir!== undefined){
	console.log('Home directory',dir)
	process.chdir(dir)
}

app.get('/', function(req, res){
  res.sendfile('index.html')
})
app.use(express.static(dir))

var credentials = {key: privateKey, cert: certificate}
var srv = https.createServer(credentials, app)
srv.listen(port)
console.log('Localweb listen at port',port)