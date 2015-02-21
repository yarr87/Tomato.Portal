var $ = require('jquery');

var DeviceStore = (function () {

    var baseUrl = 'http://localhost:49310/'

    var getDevices = function (callback) {

        $.ajax({
            url: baseUrl + 'api/devices',
            dataType: 'json',
            success: callback,
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };

    var getDeviceById = function(id, callback) {
        $.ajax({
            url: baseUrl + 'api/devices/' + id,
            dataType: 'json',
            success: callback,
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };

    var addDevice = function (device, callback) {

        $.ajax({
            url: baseUrl + 'api/devices',
            dataType: 'json',
            data: device,
            method: 'POST'//,
            //success: callback,
            //error: function (xhr, status, err) {
            //    console.error(this.props.url, status, err.toString());
            //}.bind(this)
        });
    };

    var sendCommand = function (device, command) {

        $.ajax({
            url: baseUrl + 'api/devices/' + device.name + '/' + command,
            dataType: 'json',
            method: 'POST',
            //success: callback,
            error: function (xhr, status, err) {
                //console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };

    return {
        getDevices: getDevices,
        getDeviceById: getDeviceById,
        addDevice: addDevice,
        sendCommand: sendCommand
    };

})();

module.exports = DeviceStore;