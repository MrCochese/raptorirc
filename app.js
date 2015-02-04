'use strict'

var net = require('net');

var events = require('events');
var util = require('util');

var server = net.createServer(function(connection) {

	var address = connection.remoteAddress;

	console.log('connection opened from ' + address);

	connection.on('end', function() {
		console.log('connection from ' + address + ' closed\n');
	});

	connection.on('data', function() {
		connection.write('No chance!\n');
	});

	connection.write('Let off some steam, Bennett!');
});

server.listen(6667, function() {
	console.log('listening for connections on 6667')
});