var constants = {
	dev: {
		ServerUrl: 'http://localhost:49310/', //'http://192.168.0.2:49310/',
		ApiBaseUrl: 'http://localhost:49310/api/'
	},
	prod: {
		ServerUrl: 'http://automato:81/',// 'http://localhost:49310/', //'http://192.168.0.2:49310/',
		ApiBaseUrl: 'http://automato:81/api/' //'http://localhost:49310/api/'
	}
};

// Set in gulp via envify
var env = process.env.NODE_ENV;

module.exports = constants[env];

// Expose globally for hubs
window._constants = constants[env];