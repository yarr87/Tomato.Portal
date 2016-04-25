var $ = window.jQuery;

// Can't get this to work with require so using global objects

hub = $.connection.deviceStateHub;
$.connection.hub.url = window._constants.ServerUrl + 'signalr';// 'http://localhost:49310/signalr';

// React to a signalR broadcast of status updates
hub.client.broadcastStateUpdates = function (updates) {

	updates.forEach(function(update) {
		// TODO: need to hook into dispatch somehow
		window._deviceStateSet(update.internalName, update.state);
	});
};

hub.connection.start();