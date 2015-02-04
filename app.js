'use strict'

var net = require('net');
var messageReader = require('./messageReader.js')

var server = net.createServer(function(connection) {

	var nick = null;
	var registered = false;

	var address = connection.remoteAddress;

	console.log('connection opened from ' + address);

	connection.on('end', function() {
		console.log('connection from ' + address + ' closed\n');
	});

	var commandProcessor = function(message) {
		var command = message.match(/\w+/g);

		console.log(command);

		if (command && command.length > 1 && command[0] === 'NICK') {
			registered = true;
			nick = command[1];
			connection.write('Nick changed to ' + nick + '\n');
		}
		else if (!registered)
		{
			connection.write('Use NICK to set user name\n');
		}
		else
		{
			connection.write('Command not recognised\n');
		}
	};

	var listener = messageReader.read(connection); 
	listener.on('message', commandProcessor);

	connection.write('Let off some steam, Bennett!\n');
});

server.listen(6667, function() {
	console.log('listening for connections on 6667')
});