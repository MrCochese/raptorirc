'use strict'

var net = require('net');

var events = require('events');
var util = require('util');

var server = net.createServer(function(connection) {
	console.log('connection opened');

	connection.write('Let off some steam, Bennett!');
});

server.listen(6667, function() {
	console.log('listening for connections on 6667')
});