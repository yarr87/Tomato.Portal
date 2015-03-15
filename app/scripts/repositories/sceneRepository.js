var $ = require('jquery');
var constants = require('appConstants');
var globals = require('globals');
var request = require('globals').request;
var promise2 = require('bluebird').promise;
var Promise = require('bluebird');
var _ = require('lodash');

var SceneRepository = (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _scenes = [];
    var _scenePromise;

    var getScenes = function () {

        if (_scenes.length) {
          return Promise.resolve(_scenes);
        }
        else if (_scenePromise) {
          return _scenePromise;
        }

        var result = request.get(baseUrl + 'scenes');

        _scenePromise = result.promise().then(function(result) {
            _scenes = result.body;
            _scenePromise = undefined;
            return result.body;
        });

        return _scenePromise;
    };

    // var addDevice = function (device) {

    //     return request.post(baseUrl + 'devices')
    //                   .send(device)
    //                   .promise()
    //                   .then(function(result) {
    //                     return result.body;
    //                   });
    // };

    // var deleteDevice = function (device) {
    //   return request.del(baseUrl + 'devices/' + device.id)
    //                 .send()
    //                 .promise();
    // };

    // var sendCommand = function (device, state) {

    //     return request.post(baseUrl + 'devices/' + device.internalName + '/set/state/' + state)
    //                   .send({})
    //                   .promise()
    //                   .then(function(result) {
    //                     return result.body;
    //                   });
    // };

    return {
        getScenes: getScenes
    };

})();

module.exports = SceneRepository;