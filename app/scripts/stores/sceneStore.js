var Reflux = require('reflux');
var actions = require('actions/actions');
var sceneRepo = require('repositories/sceneRepository');
var _ = require('lodash');
var $ = require('jquery');

var sceneStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.scenes = [];
    },

    onLoadScenes: function() {
        sceneRepo.getScenes().then(function(scenes) {
            this.scenes = scenes;
            this.trigger(this.scenes);
        }.bind(this));
    }

});

module.exports = sceneStore;