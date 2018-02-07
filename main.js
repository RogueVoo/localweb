var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	cors = require('cors')
	
var app = express()
var dir = path.resolve(process.argv[2])
var index = process.argv[3] || 'index.html'
var port = process.argv[4] || 80

if(dir!== undefined){
	console.log('Home directory',dir)
	process.chdir(dir)
}

app.use(cors({
  origin: '*'
}))

app.get('/', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.sendfile(index)
})
app.use(express.static(dir))
app.listen(port)

console.log('Localweb listen at port',port)