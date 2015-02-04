'use strict'

var events = require('events');
var util = require('util');

var MessageReader = function(stream) {
	events.EventEmitter.call(this);

	var self = this;
	var buffer = '';

	stream.on('data', function(data) {
		buffer += data;
		var boundary = buffer.indexOf('\r\n');
		while(boundary !== -1) {
			var message = buffer.substr(0, boundary);
			buffer = buffer.substr(boundary + 1);
			self.emit('message', message);
			boundary = buffer.indexOf('\r\n');
		}
	});
}

util.inherits(MessageReader, events.EventEmitter);

exports.MessageReader = MessageReader;
exports.read = function(stream) {
	return new MessageReader(stream);
}