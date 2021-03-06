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

    // rule actions
    'deleteRule',
    'loadRules',
    'saveRule',

    // scene actions
    'loadScenes',
    'deleteScene',
    'saveScene',
    'testScene',
    'triggerScene',

    // scene trigger (minimote) actions
    'loadSceneTriggers',
    'saveSceneTriggers',

    // thermostat actions
    'loadThermostats',
    'saveThermostat',
    'deleteThermostat',

    // sonos actions
    'loadSonoses',
    'saveSonos',
    'deleteSonos',
    'playSonos',
    'pauseSonos',
    'playSonosFavorite'
]);

module.exports = actions;

// Expose globally for use by hubs
window._actions = actions;