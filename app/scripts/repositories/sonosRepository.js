var $ = require('jquery');
var constants = require('appConstants');
var globals = require('globals');
var request = require('globals').request;
var promise2 = require('bluebird').promise;
var Promise = require('bluebird');
var _ = require('lodash');

var SonosRepository = (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _sonos = [];
    var _sonosPromise;

    var getSonos = function (callback) {

        if (_sonos.length) {
          return Promise.resolve(_sonos);
        }
        else if (_sonosPromise) {
          return _sonosPromise;
        }

        var result = request.get(baseUrl + 'sonos');

        _sonosPromise = result.promise().then(function(result) {
            _sonos = result.body;
            _sonosPromise = undefined;
            return result.body;
        });

        return _sonosPromise;
    };

    var getSonosById = function(id, callback) {

      // Assuming the entire list is already loaded...
      return getSonos().then(function(sonos) {
        return _.find(sonos, { id: id });
      });
    };

    var saveSonos = function (sonos) {

        return request.post(baseUrl + 'sonos')
                      .send(sonos)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteSonos = function (sonos) {
      return request.del(baseUrl + 'sonos/' + sonos.id)
                    .send()
                    .promise();
    };

    var play = function(sonos) {
      return request.post(`${baseUrl}sonos/${sonos.name}/play`)
                    .send()
                    .promise();
    };

    var pause = function(sonos) {
      return request.post(`${baseUrl}sonos/${sonos.name}/pause`)
                    .send()
                    .promise();
    };

    var playFavorite = function(sonos, favorite) {
      // In query string because it might have weird characters
      return request.post(`${baseUrl}sonos/${sonos.name}/favorite`)
                    .query({ favorite: favorite })
                    .send()
                    .promise();
    }

    return {
        getSonos: getSonos,
        getSonosById: getSonosById,
        saveSonos: saveSonos,
        deleteSonos: deleteSonos,
        play: play,
        pause: pause,
        playFavorite: playFavorite
    };

})();

module.exports = SonosRepository;