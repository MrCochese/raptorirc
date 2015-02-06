var assert = require('assert');
var events = require('events');
var messageReader = require('../messageReader');

describe('MessageReader', function() {
	it('should raise a message event with contents of buffer when CR-lF is read from a chunk', function(done) {
		var stream = new events.EventEmitter();

		var reader = messageReader.read(stream);

		reader.on('message', function(message) {
			assert.equal('this is a message split over two chunks', message);
			done();
		});

		stream.emit('data', 'this is a message ');
		stream.emit('data', 'split over two chunks\r\n');
	});
});