var connections = [];

module.exports = function(userInfo) {
    var nick = userInfo.nick;
    var user;
    var registered = userInfo.registered;
	var connection = userInfo.connection;

    return {
    	user : function(user) {
    		user = user;
    	},
        process: function(message) {
            var command = message.match(/\w+/g);

            console.log(command);

            if (command && command.length > 1) {
                if (command[0] === 'NICK') {
                    nick = command[1];
                    connection.write('Nick changed to ' + nick + '\n');
                } else if (command[0] === 'USER') {
                    registered = true;
                    user = command[1];

                    if (!nick) {
                        nick = user;
                    }

                    connections.push(connection);

                    connection.write('User registered: ' + user + '\n');
                } else if (command[0] === 'MESSAGE') {
                    if (!registered) {
                        connection.write('User not registered');
                        return;
                    }

                    var delimited = message.match(/"(.*)"/g);
                    console.log(delimited);

                    for (var i = 0; i < connections.length; i++) {
                        console.log(nick + ': ' + delimited[0]);
                        connections[i].write(nick + ': ' + delimited[0] + '\n');
                    }
                }
            } else if (!nick) {
                connection.write('Use NICK to set user name\n');
            } else if (!registered) {
                connection.write('Use USER to register user\n');
            } else {
                connection.write('Command not recognised\n');
            }
        }
    };
};