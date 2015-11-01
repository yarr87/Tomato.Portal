var Reflux = require('reflux');

var actions = Reflux.createActions([
    // device actions
    'deleteDevice',
    'loadDevices',
    'saveDevice',
    'setDeviceState', // User updates state in the app
    'setMultipleDeviceStates', // User updates the state of many devices at once (ie, All On/Off)
    'deviceStatesUpdated', // States are updated from server

    // tag actions
    'deleteTag',
    'loadTags',
    'saveTag',

    // user actions
    'deleteUser',
    'loadUsers',
    'saveUser',

    // scene actions
    'loadScenes'

]);

module.exports = actions;

// Expose globally for use by hubs
window._actions = actions;