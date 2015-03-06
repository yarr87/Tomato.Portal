var $ = window.jQuery;
$.support.cors = true;
hub = $.connection.deviceStateHub;
$.connection.hub.url = 'http://localhost:49310/signalr';

hub.client.broadcastStateUpdate = function (params) {
	console.log(params);
};

hub.connection.start();