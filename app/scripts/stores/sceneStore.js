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
            this.trigger({
                scenes: this.scenes
            });
        }.bind(this));
    },

    onDeleteScene: function(scene) {

        var index = _.findIndex(this.scenes, { id: scene.id });

        if (index >= 0) {
            this.scenes.splice(index, 1);

            this.trigger({
                scenes: this.scenes,
                deletedSceneId: scene.id
            });

            sceneRepo.deleteScene(scene);
        } 
    },

    onSaveScene: function(scene) {

        var localscene = _.find(this.scenes, { id: scene.id });

        if (localscene) {
            $.extend(localscene, scene);
        }
        else {
            localscene = scene;
            this.scenes.push(localscene);
        }

        sceneRepo.saveScene(scene).then(function(updatedScene) {
            // Updates from server (mostly for id on insert)
            $.extend(localscene, updatedScene);

            this.trigger({
                scenes: this.scenes,
                // scene just updated so we know which one to update in anything with scene embedded
                updatedScene: localscene
            });
        }.bind(this));

        this.trigger({
                scenes: this.scenes,
                // Tag just updated so we know which one to update in linked devices
                updatedScene: localscene
            });
    },

    onTestScene: function(scene) {
        sceneRepo.testScene(scene);
    },

    onTriggerScene: function(scene) {
        sceneRepo.triggerScene(scene);
    }

});

module.exports = sceneStore;