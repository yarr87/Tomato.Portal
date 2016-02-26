var Reflux = require('reflux');
var actions = require('actions/actions');
var sonosRepo = require('repositories/sonosRepository');
var _ = require('lodash');
var $ = require('jquery');

var sonosStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.sonoses = [];
    },

    onLoadSonoses: function() {
        sonosRepo.getSonos().then(function(sonoses) {
            this.sonoses = sonoses;
            this.trigger({
                sonoses: this.sonoses
            });
        }.bind(this));
    },

    onDeleteSonos: function(sonos) {

        var index = _.findIndex(this.sonoses, { id: sonos.id });

        if (index >= 0) {
            this.sonoses.splice(index, 1);

            this.trigger({
                sonoses: this.sonoses,
                deletedSonosId: sonos.id
            });

            sonosRepo.deleteSonos(sonos);
        } 
    },

    onSaveSonos: function(sonos) {

        var localSonos = _.find(this.sonos, { id: sonos.id });

        if (localSonos) {
            $.extend(localSonos, sonos);
        }
        else {
            localSonos = sonos;
            this.sonoses.push(localSonos);
        }

        sonosRepo.saveSonos(sonos).then(function(updatedsonos) {
            // Updates from server (mostly for id on insert)
            $.extend(localSonos, updatedsonos);

            this.trigger({
                sonoses: this.sonoses,
                // sonos just updated so we know which one to update in anything with sonos embedded
                updatedSonos: localSonos
            });
        }.bind(this));

        this.trigger({
                sonoses: this.sonoses,
                updatedSonos: localSonos
            });
    },

    onPlaySonos: function(sonos) {
        sonosRepo.play(sonos);
    },

    onPauseSonos: function(sonos) {
        sonosRepo.pause(sonos);
    }

});

module.exports = sonosStore;