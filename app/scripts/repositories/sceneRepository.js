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

    var getSceneById = function(id) {

      // Assuming the entire list is already loaded...
      return getScenes().then(function(scenes) {
        return _.find(scenes, { id: id });
      });
    };

    var saveScene = function (scene) {

        return request.post(baseUrl + 'scenes')
                      .send(scene)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteScene = function (scene) {
      return request.del(baseUrl + 'scene/' + scene.id)
                    .send()
                    .promise();
    };

    var testScene = function(scene) {
        return request.post(baseUrl + 'scenes/test')
                      .send(scene)
                      .promise();
    };

    var triggerScene = function(scene) {
        return request.post(baseUrl + 'scenes/' + scene.id)
                      .send(scene)
                      .promise();
    }

    return {
        getScenes: getScenes,
        getSceneById: getSceneById,
        saveScene: saveScene,
        deleteScene: deleteScene,
        testScene: testScene,
        triggerScene: triggerScene
    };

})();

module.exports = SceneRepository;