import request  from 'superagent'
import promise from 'bluebird'
var constants = require('appConstants');
var _ = require('lodash');

export default (function () {

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

        var result = request.get(baseUrl + 'scenes').accept('application/json');

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
      return request.del(baseUrl + 'scenes/' + scene.id)
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
    };

    return {
        getScenes: getScenes,
        getSceneById: getSceneById,
        saveScene: saveScene,
        deleteScene: deleteScene,
        testScene: testScene,
        triggerScene: triggerScene
    };

})();