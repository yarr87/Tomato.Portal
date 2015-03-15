var Reflux = require('reflux');

var actions = Reflux.createActions([
    // device actions
    'deleteDevice',
    'loadDevices',
    'saveDevice',
    'setDeviceState', // User updates state in the app
    'deviceStatesUpdated', // States are updated from server

    // tag actions
    'deleteTag',
    'loadTags',
    'saveTag',

    // scene actions
    'loadScenes'

]);

module.exports = actions;

// Expose globally for use by hubs
window._actions = actions;