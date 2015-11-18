var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Device = require('components/devices/device');

// Edit a single device state action for a rule
var EditRuleActionDeviceState = React.createClass({
    
    handleDeviceStateChange: function(device, state) {
        this.props.deviceState.state = state;
        this.props.onUpdate(this.props.deviceState, this.props.index);
    },

    render: function () {

        var selectedLight = this.props.deviceState.internalName;

        var device = _.find(this.props.devices, { internalName: this.props.deviceState.internalName });

        if (device) {

            var deviceCopy = _.clone(device, true);

            deviceCopy.state = this.props.deviceState.state;

            return (
                <Device item={deviceCopy} doNotBroadcastStateChanges={true} isCompact={true} onStateChange={this.handleDeviceStateChange} />
            );

        }

        return (<div>loading...</div>);
    }
});

module.exports = EditRuleActionDeviceState;