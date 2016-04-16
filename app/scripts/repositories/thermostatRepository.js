import request  from 'superagent'
import promise from 'bluebird'
var constants = require('appConstants');
var _ = require('lodash');

export default (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _thermostats = [];
    var _thermostatPromise;

    var getThermostats = function (callback) {

        if (_thermostats.length) {
          return Promise.resolve(_thermostats);
        }
        else if (_thermostatPromise) {
          return _thermostatPromise;
        }

        var result = request.get(baseUrl + 'thermostats');

        _thermostatPromise = result.promise().then(function(result) {
            _thermostats = result.body;
            _thermostatPromise = undefined;
            return result.body;
        });

        return _thermostatPromise;
    };

    var getThermostatById = function(id, callback) {

      // Assuming the entire list is already loaded...
      return getThermostats().then(function(thermostats) {
        return _.find(thermostats, { id: id });
      });
    };

    var saveThermostat = function (thermostat) {

        return request.post(baseUrl + 'thermostats')
                      .send(thermostat)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteThermostat = function (thermostat) {
      return request.del(baseUrl + 'thermostats/' + thermostat.id)
                    .send()
                    .promise();
    };

    return {
        getThermostats: getThermostats,
        getThermostatById: getThermostatById,
        saveThermostat: saveThermostat,
        deleteThermostat: deleteThermostat
    };

})();