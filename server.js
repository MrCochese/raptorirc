var net = require('net');
var messageReader = require('./messageReader.js');
var CommandProcessor = require('./commandProcessor.js');

module.exports = function() {
    return net.createServer(function(connection) {

        var nick = null;
        var registered = false;
        var user = null;

        var address = connection.remoteAddress;

        console.log('connection opened from ' + address);

        connection.on('end', function() {
            console.log('connection from ' + address + ' closed\n');

            var index = connections.indexOf(connection);
            if (index > -1) {
                connections.splice(index, 1);
            }
        });

        var commandProcessor = new CommandProcessor({
            nick: null,
            registered: false,
            connection: connection
        })
        commandProcessor.user(null);

        var listener = messageReader.read(connection);
        listener.on('message', commandProcessor.process);

        connection.write('Let off some steam, Bennett!\n');
    });
}