var Reflux = require('reflux');
var actions = require('actions/actions');
var sceneTriggerRepo = require('repositories/sceneTriggerRepository');
var _ = require('lodash');
var $ = require('jquery');

var sceneTriggerStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.triggers = [];
    },

    onLoadSceneTriggers: function() {
        sceneTriggerRepo.getSceneTriggers().then(function(triggers) {
            this.triggers = triggers;
            this.trigger({
                triggers: this.triggers
            });
        }.bind(this));
    },

    onSaveSceneTriggers: function(triggers) {

        sceneTriggerRepo.saveSceneTriggers(triggers).then(function(updatedTriggers) {
            this.trigger({
                triggers: updatedTriggers
            });
        }.bind(this));
    }

});

module.exports = sceneTriggerStore;