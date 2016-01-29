var Reflux = require('reflux');
var actions = require('actions/actions');
var deviceRepo = require('repositories/deviceRepository');
var tagStore = require('stores/tagStore');
var _ = require('lodash');
var $ = require('jquery');

var deviceStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.devices = [];
        //actions.loadDevices();

        this.listenTo(tagStore, this.onTagUpdate); // use to update tags when they change
    },

    onDeleteDevice: function(device) {

        var index = _.findIndex(this.devices, { id: device.id });

        if (index >= 0) {
            this.devices.splice(index, 1);

            this.trigger(this.devices);

            deviceRepo.deleteDevice(device);
        } 
    },

    onDeviceStatesUpdated: function(updates) {

        var updated = false;

        _.each(updates, function(update) {
            var localDevice = _.find(this.devices, { internalName: update.internalName });

            if (localDevice && localDevice.state !== update.state) {
                localDevice.state = update.state;
                updated = true;
            }
        }.bind(this));

        if (updated) {
            this.trigger(this.devices);
        }
    },

    onLoadDevices: function() {
        deviceRepo.getDevices().then(function(devices) {
            this.devices = devices;
            this.trigger(this.devices)
        }.bind(this));
    },

    // local version shared between single and multiple versions
    _setDeviceState: function(device, state, doTrigger) {
        deviceRepo.sendCommand(device.internalName, state);

        var localDevice = _.find(this.devices, { id: device.id });

        if (localDevice) {
            
            localDevice.state = state;

            if (doTrigger) {
                this.trigger(this.devices);
            }
        }
    },

    onSetDeviceState: function(device, state) {
        this._setDeviceState(device, state, true);
    },

    onSetMultipleDeviceStates: function(devices, state) {

        _.each(devices, (device) => {

            this._setDeviceState(device, state, false);

        });


        this.trigger(this.devices); 
    },

    onSaveDevice: function(device) {

        var localDevice = _.find(this.devices, { id: device.id });

        if (localDevice) {
            $.extend(localDevice, device);
        }
        else {
            localDevice = device;
            this.devices.push(localDevice);
        }

        deviceRepo.addDevice(device).then(function(updatedDevice) {
            // Updates from server (mostly for id on insert)
            $.extend(localDevice, updatedDevice);

            this.trigger(this.devices);
        }.bind(this));

        this.trigger(this.devices);
    },

    // When a tag is updated, update the name of all tags linked to devices
    onTagUpdate: function(tagObj) {
        // A tag was updated
        if (tagObj.updatedTag) {
        
            _.each(this.devices, function(device) {

                var tag = _.find(device.tags, { id: tagObj.updatedTag.id });

                // Copy this tag onto the device tag
                if (tag) {
                    $.extend(tag, tagObj.updatedTag);
                }

            });
        }
        // A tag was deleted, remove it from all devices
        else if (tagObj.deletedTagId) {
            _.each(this.devices, function(device) {

                device.tags = _.filter(device.tags, function(tag) {
                    return tag.id !== tagObj.deletedTagId;
                })

            });
        }
        else {
            return;
        }

        this.trigger(this.devices);
    }

});

module.exports = deviceStore;