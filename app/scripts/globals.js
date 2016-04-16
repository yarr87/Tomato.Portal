// global modules
require('superagent-bluebird-promise');

export default {
	React: require('react'),
	Router: require('react-router'),
	request: require('superagent'),
	promise: require('bluebird'),
	// Used indirectly
	SuperagentPromise: require('superagent-bluebird-promise')
};