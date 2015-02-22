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

        // if (device) {
        //     device.state = options.state;
        // } 
    },

    onSaveDevice: function(device) {

        var localDevice = _.find(this.devices, { name: device.name });

        if (localDevice) {
            $.extend(localDevice, device);
        }
        else {
            this.devices.push(device);
        }

        deviceRepo.addDevice(device);

        this.trigger(this.devices);
    }

    // setSortBy: function(value) {
    //     this.sortOptions.currentValue = value;
    // },

    // listenToPosts: function(pageNum) {
    //     this.currentPage = pageNum;
    //     postsRef
    //         .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
    //         // + 1 extra post to determine whether another page exists
    //         .limitToLast((this.currentPage * postsPerPage) + 1)
    //         .on('value', this.updatePosts.bind(this));
    // },

    // stopListeningToPosts: function() {
    //     postsRef.off();
    // },

    // updatePosts: function(postsSnapshot) {
    //     // posts is all posts through current page + 1
    //     var endAt = this.currentPage * postsPerPage;
    //     // accumulate posts in posts array
    //     var posts = [];
    //     postsSnapshot.forEach(function(postData) {
    //         var post = postData.val();
    //         post.id = postData.key();
    //         posts.unshift(post);
    //     });

    //     // if extra post doesn't exist, indicate that there are no more posts
    //     this.nextPage = (posts.length === endAt + 1);        
    //     // slice off extra post
    //     this.posts = posts.slice(0, endAt);

    //     this.trigger({
    //         posts: this.posts,
    //         currentPage: this.currentPage,
    //         nextPage: this.nextPage,
    //         sortOptions: this.sortOptions
    //     });
    // },

    // getDefaultData: function() {
    //     return {
    //         posts: this.posts,
    //         currentPage: this.currentPage,
    //         nextPage: this.nextPage,
    //         sortOptions: this.sortOptions
    //     };
    // }

});

module.exports = deviceStore;