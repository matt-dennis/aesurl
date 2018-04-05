const sha1 = require('sha1')

//express is the webserver
const express = require('express')

//crpto is how we decrypt
const crypto = require('crypto');

//you have to do this to set it up to be a server
var app = express()

//tell it to listen on a port
app.set('port', (process.env.PORT || 5000))

//this tells it which directory to use as the base for files and stuff
app.use(express.static(__dirname + '/public'))

//when someone makes a GET request to /   it runs this function and sends the payload
app.get('/', function(request, response) {


	let algorithm = 'aes-128-cbc';
	var iv = '39383736353433323130393837363534', //hex value
	key = '1a38db93d9214eda20b1a514afe63c5d',//hex value
	payload = request.query.data;
	//payload is encrypted ascii json

	const salt = 'truth of source';

	const valid = sha1(payload + salt) === request.query.hash;
	console.log(valid);
	//for some weird reason, i had to add a few characters to make it work properly
	payload += 'aaaa';

	const decipher = crypto.createDecipheriv(algorithm, new Buffer(key,'hex'), new Buffer(iv,'hex'));
	const decryptedPayload = decipher.update(new Buffer(payload, 'hex'), 'hex', 'ascii');      

	response.send(decryptedPayload); 

})

//this is how you start it up
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
