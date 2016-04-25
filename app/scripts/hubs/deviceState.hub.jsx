import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
var $ = require('jquery');
require('signalr');
import { deviceStateSet } from '../actions/device.actions'

// Activates the signalR hub and dispatches actions when server-side events update device state
class DeviceStateHub extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        let { deviceStateSet } = this.props;

        // Minor hack, in a timeout so we can be sure the dynamc hubs script has already run.  Not sure if that can
        // be browserified.
        setTimeout(() => {

            let hub = $.connection.deviceStateHub;
            $.connection.hub.url = window._constants.ServerUrl + 'signalr';// 'http://localhost:49310/signalr';

            // React to a signalR broadcast of status updates
            hub.client.broadcastStateUpdates = function (updates) {

                updates.forEach(function(update) {
                    // TODO: need to hook into dispatch somehow
                    deviceStateSet(update.internalName, update.state);
                });
            };

            hub.connection.start();
        }, 100);
    }

    render () {
        return null;        
    }
}

export default connect(undefined, {
    deviceStateSet
})(DeviceStateHub)