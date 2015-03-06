'use strict'
var server = require('/server')();

server.listen(6667, function() {
    console.log('listening for connections on 6667')
});