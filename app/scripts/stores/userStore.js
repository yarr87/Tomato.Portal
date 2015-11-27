var Reflux = require('reflux');
var actions = require('actions/actions');
var userRepo = require('repositories/userRepository');
var _ = require('lodash');
var $ = require('jquery');

var userStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.users = [];
    },

    onDeleteUser: function(user) {

        var index = _.findIndex(this.users, { id: user.id });

        if (index >= 0) {
            this.users.splice(index, 1);

            this.trigger({
                users: this.users,
                deletedUserId: user.id
            });

            userRepo.deleteUser(user);
        } 
    },

    onLoadUsers: function() {
        userRepo.getUsers().then(function(users) {
            this.users = users;
            this.trigger({
                users: this.users
            });
        }.bind(this));
    },

    onSaveUser: function(user) {

        var localUser = _.find(this.users, { id: user.id });

        if (localUser) {
            $.extend(localUser, user);
        }
        else {
            localUser = user;
            this.users.push(localUser);
        }

        userRepo.saveUser(user).then(function(updatedUser) {
            // Updates from server (mostly for id on insert)
            $.extend(localUser, updatedUser);

            this.trigger({
                users: this.users,
                // User just updated so we know which one to update in anything with user embedded
                updatedUser: localUser
            });
        }.bind(this));

        this.trigger({
                users: this.users,
                // Tag just updated so we know which one to update in linked devices
                updatedUser: localUser
            });
    }

});

module.exports = userStore;