var constants = {
	ServerUrl: 'http://192.168.0.2:49310/',
	//ApiBaseUrl: 'http://192.168.0.2:49310/api/'
	ApiBaseUrl: 'http://localhost:49310/api/'
};

module.exports = constants;

// Expose globally for hubs
window._constants = constants;