import request  from 'superagent'
import promise from 'bluebird'
var constants = require('appConstants');
var _ = require('lodash');

var SceneTriggerRepository = (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _sceneTriggers = [];
    var _promise;

    var getSceneTriggers = function () {

        if (_sceneTriggers.length) {
          return Promise.resolve(_sceneTriggers);
        }
        else if (_promise) {
          return _promise;
        }

        var result = request.get(baseUrl + 'scenes/triggers');

        _promise = result.promise().then(function(result) {
            _sceneTriggers = result.body;
            _promise = undefined;
            return result.body;
        });

        return _promise;
    };

    var saveSceneTriggers = function (triggers) {

        return request.post(baseUrl + 'scenes/triggers')
                      .send(triggers)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    return {
        getSceneTriggers: getSceneTriggers,
        saveSceneTriggers: saveSceneTriggers
    };

})();

module.exports = SceneTriggerRepository;