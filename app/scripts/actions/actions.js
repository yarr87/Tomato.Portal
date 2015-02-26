var Reflux = require('reflux');

var actions = Reflux.createActions([
    // device actions
    'deleteDevice',
    'loadDevices',
    'saveDevice',
    'setDeviceState',

    // user actions
    'login',
    'logout',
    'register',
    'createProfile',
    'updateProfile',
    // post actions
    'upvotePost',
    'downvotePost',
    'submitPost',
    'deletePost',
    'setSortBy',
    // comment actions
    'upvoteComment',
    'downvoteComment',
    'updateCommentCount',
    'addComment',
    'deleteComment',
    // firebase actions
    'listenToProfile',
    'listenToPost',
    'listenToPosts',
    'stopListeningToProfile',
    'stopListeningToPosts',
    'stopListeningToPost',
    // error actions
    'loginError',
    'postError',
    // ui actions
    'showOverlay',
    'goToPost'
]);

module.exports = actions;