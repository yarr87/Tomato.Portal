var Reflux = require('reflux');

var actions = Reflux.createActions([
    // device actions
    'deleteDevice',
    'loadDevices',
    'saveDevice',
    'setDeviceState',

    // tag actions
    'deleteTag',
    'loadTags',
    'saveTag'

]);

module.exports = actions;