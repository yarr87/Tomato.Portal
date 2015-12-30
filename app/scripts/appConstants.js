var _ = require('lodash');

// Per-environment constants
var envConstants = {
	dev: {
		ServerUrl: 'http://localhost:49310/', //'http://192.168.0.2:49310/',
		ApiBaseUrl: 'http://localhost:49310/api/'
	},
	prod: {
		ServerUrl: 'http://automato:81/',// 'http://localhost:49310/', //'http://192.168.0.2:49310/',
		ApiBaseUrl: 'http://automato:81/api/' //'http://localhost:49310/api/'
	}
};

// Common constants same for all environments
var commonConstants = {
	// Special user ids used for rules.  Matches a server constant
	UserIds: {
		Anyone: 'ANYONE',
		NoOne: 'NOONE'
	}
};

// Set in gulp via envify
var env = process.env.NODE_ENV;

var constants = _.extend(commonConstants, envConstants[env]);

module.exports = constants;

// Expose globally for hubs
window._constants = constants;