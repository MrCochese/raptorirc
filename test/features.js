var assert = require('assert');
var server = require('../server')();
var net = require('net');

server.listen(12345, function() {
    describe('connection', function() {
        it('should return the MOTD on connection', function(done) {
            var socket = net.connect({
                host: 'localhost',
                port: 12345
            });

            socket.on('data', function(chunk) {
                assert.equal('Let off some steam, Bennett!\n', chunk);
                done();
            });
        });
    });
});