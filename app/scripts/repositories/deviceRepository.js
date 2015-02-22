var $ = require('jquery');
var globals = require('globals');
var request = require('globals').request;
var promise2 = require('bluebird').promise;
var Promise = require('bluebird');
var _ = require('lodash');

var DeviceRepository = (function () {

    var baseUrl = 'http://localhost:49310/'

    var _devices = [];
    var _devicePromise;

    var getDevices = function (callback) {

        if (_devices.length) {
          return Promise.resolve(_devices);
        }
        else if (_devicePromise) {
          return _devicePromise;
        }

        var result = request.get(baseUrl + 'api/devices');

        _devicePromise = result.promise().then(function(result) {
            _devices = result.body;
            _devicePromise = undefined;
            return result.body;
        });

        return _devicePromise;
    };

    var getDeviceById = function(id, callback) {

      // Assuming the entire list is already loaded...
      return getDevices().then(function(devices) {
        return _.find(devices, { id: id });
      });

        // return request.get(baseUrl + 'api/devices/' + id)
        //               .promise()
        //               .then(function(result) {
        //                 return result.body;
        //               });
    };

    var addDevice = function (device, callback) {

        return request.post(baseUrl + 'api/devices')
                      .send(device)
                      .promise();
    };

    var sendCommand = function (device, command) {

        return request.post(baseUrl + 'api/devices/' + device.name + '/' + command)
                      .send({})
                      .promise();
    };

    return {
        getDevices: getDevices,
        getDeviceById: getDeviceById,
        addDevice: addDevice,
        sendCommand: sendCommand
    };

})();

module.exports = DeviceRepository;