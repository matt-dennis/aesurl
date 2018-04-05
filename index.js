var express = require('express')
const crypto = require('crypto');

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {


	let algorithm = 'aes-128-cbc';
	var iv = '39383736353433323130393837363534', //hex value
	key = '1a38db93d9214eda20b1a514afe63c5d',//hex value
	payload = request.query.data;
	//payload is encrypted ascii json

	//for some weird reason, i had to add a few characters to make it work properly
	payload += 'aaaa';

	const decipher = crypto.createDecipheriv(algorithm, new Buffer(key,'hex'), new Buffer(iv,'hex'));
	const decryptedPayload = decipher.update(new Buffer(payload, 'hex'), 'hex', 'ascii');      

	response.send(decryptedPayload); 

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
