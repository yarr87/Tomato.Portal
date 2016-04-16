import request  from 'superagent'
import promise from 'bluebird'

var constants = require('appConstants');
var _ = require('lodash');

export default (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _devices = [];
    var _devicePromise;

    var getDevices = function () {

        if (_devices.length) {
          return Promise.resolve(_devices);
        }
        else if (_devicePromise) {
          return _devicePromise;
        }

        var result = request.get(baseUrl + 'devices');

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

        // return request.get(baseUrl + 'devices/' + id)
        //               .promise()
        //               .then(function(result) {
        //                 return result.body;
        //               });
    };

    var addDevice = function (device) {

        return request.post(baseUrl + 'devices')
                      .send(device)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteDevice = function (device) {
      return request.del(baseUrl + 'devices/' + device.id)
                    .send()
                    .promise();
    };

    var sendCommand = function (internalName, state) {

        return request.post(baseUrl + 'devices/' + internalName + '/set/state/' + state)
                      .send({})
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    return {
        getDevices: getDevices,
        getDeviceById: getDeviceById,
        addDevice: addDevice,
        deleteDevice: deleteDevice,
        sendCommand: sendCommand
    };

})();