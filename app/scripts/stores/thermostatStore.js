var Reflux = require('reflux');
var actions = require('actions/actions');
var thermostatRepo = require('repositories/thermostatRepository');
var _ = require('lodash');
var $ = require('jquery');

var thermostatStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.thermostats = [];
    },

    onLoadThermostats: function() {
        thermostatRepo.getThermostats().then(function(thermostats) {
            this.thermostats = thermostats;
            this.trigger({
                thermostats: this.thermostats
            });
        }.bind(this));
    },

    onDeleteThermostat: function(thermostat) {

        var index = _.findIndex(this.thermostats, { id: thermostat.id });

        if (index >= 0) {
            this.thermostats.splice(index, 1);

            this.trigger({
                thermostats: this.thermostats,
                deletedThermostatId: thermostat.id
            });

            thermostatRepo.deleteThermostat(thermostat);
        } 
    },

    onSaveThermostat: function(thermostat) {

        var localThermostat = _.find(this.thermostats, { id: thermostat.id });

        if (localThermostat) {
            $.extend(localThermostat, thermostat);
        }
        else {
            localThermostat = thermostat;
            this.thermostats.push(localThermostat);
        }

        thermostatRepo.saveThermostat(thermostat).then(function(updatedThermostat) {
            // Updates from server (mostly for id on insert)
            $.extend(localThermostat, updatedThermostat);

            this.trigger({
                thermostats: this.thermostats,
                // thermostat just updated so we know which one to update in anything with thermostat embedded
                updatedThermostat: localThermostat
            });
        }.bind(this));

        this.trigger({
                thermostats: this.thermostats,
                // Tag just updated so we know which one to update in linked devices
                updatedThermostat: localThermostat
            });
    }

});

module.exports = thermostatStore;