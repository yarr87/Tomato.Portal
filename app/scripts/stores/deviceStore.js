var Reflux = require('reflux');
var actions = require('actions/actions');
var deviceRepo = require('repositories/deviceRepository');
var _ = require('lodash');
var $ = require('jquery');

var deviceStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.devices = [];
        actions.loadDevices();
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
    }

});

module.exports = deviceStore;