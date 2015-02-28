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

    onLoadDevices: function() {
        deviceRepo.getDevices().then(function(devices) {
            this.devices = devices;
            this.trigger(this.devices)
        }.bind(this));
    },

    onSetDeviceState: function(device, state) {
        var localDevice = _.find(this.devices, { name: device.name });

        if (localDevice) {
            deviceRepo.sendCommand(localDevice, state);

            localDevice.state = state;

            this.trigger(this.devices);
        }
    },

    onSaveDevice: function(device) {

        var localDevice = _.find(this.devices, { name: device.name });

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
        if (!tagObj.updatedTagId) return;
        
        _.each(this.devices, function(device) {

            var tag = _.find(device.tags, { id: tagObj.updatedTag.id });

            // Copy this tag onto the device tag
            if (tag) {
                $.extend(tag, tagObj.updatedTag);
            }

        });

        this.trigger(this.devices);
    }

});

module.exports = deviceStore;