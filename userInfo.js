
var user = (function() {
	var users = [];
	return {
		addUser : function() {
            users.push({
                nick: null,
                user: null,
                registered: null
            });
		},
		getUser : function() {
			return users;
		}
	}
})();

module.exports = user;