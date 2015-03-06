var assert = require('assert');
var events = require('events');
var messageReader = require('../messageReader');
var commandProcessor = require('../commandProcessor');
var users = require('../userInfo.js');

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


// describe('A connected server with message NICK has barry', function() {
//     it('should emit a command event', function(done) {
//         var connection = sinon.stub().return();
//         var userInfo = {
//             user: null,
//             nick: null,
//             registered: null,
//             connection: connection
//         };

//         var commandProcessor = new CommandProcessor(userInfo);
//     });
// });