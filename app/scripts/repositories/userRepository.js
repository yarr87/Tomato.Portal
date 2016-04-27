import request  from 'superagent'
import promise from 'bluebird'
var constants = require('appConstants');
var _ = require('lodash');

export default (function () {

    var baseUrl = constants.ApiBaseUrl;

    var _users = [];
    var _userPromise;

    var getUsers = function () {

        if (_users.length) {
          return Promise.resolve(_users);
        }
        else if (_userPromise) {
          return _userPromise;
        }

        var result = request.get(baseUrl + 'users').accept('application/json');

        _userPromise = result.promise().then(function(result) {
            _users = result.body;
            _userPromise = undefined;
            return result.body;
        });

        return _userPromise;
    };

    var getUserById = function(id) {

      // Assuming the entire list is already loaded...
      return getUsers().then(function(users) {
        return _.find(users, { id: id });
      });
    };

    var saveUser = function (user) {

        return request.post(baseUrl + 'users')
                      .send(user)
                      .promise()
                      .then(function(result) {
                        return result.body;
                      });
    };

    var deleteUser = function (user) {
      return request.del(baseUrl + 'users/' + user.id)
                    .send()
                    .promise();
    };

    return {
        getUsers: getUsers,
        getUserById: getUserById,
        saveUser: saveUser,
        deleteUser: deleteUser
    };

})();