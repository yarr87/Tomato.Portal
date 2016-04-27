import request  from 'superagent'
import promise from 'bluebird'
var constants = require('appConstants');
var _ = require('lodash');

export default (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _tags = [];
    var _promise;

    var getTags = function (callback) {

        if (_tags.length) {
          return Promise.resolve(_tags);
        }
        else if (_promise) {
          return _promise;
        }

        var result = request.get(baseUrl + 'tags').accept('application/json');

        _promise = result.promise().then(function(result) {
            _tags = result.body;
            _promise = undefined;
            return result.body;
        });

        return _promise;
    };

    var addTag = function (tag) {

        return request.post(baseUrl + 'tags')
                      .send(tag)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteTag = function (tag) {
      return request.del(baseUrl + 'tags/' + tag.id)
                    .send()
                    .promise();
    };

    return {
        getTags: getTags,
        addTag: addTag,
        deleteTag: deleteTag,
    };

})();