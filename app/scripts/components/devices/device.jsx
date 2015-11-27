var React = require('react');
var LightSwitch = require('components/devices/lightSwitch');
var Dimmer = require('components/devices/dimmer');

var Device = React.createClass({

    handleStateChange: function(device, state) {

        if (this.props.onStateChange) {
            this.props.onStateChange(device, state);
        }

    },

    render: function () {

        var device;

        if (this.props.item.type === 'LightSwitch') {
            device = (
                <LightSwitch item={this.props.item} doNotBroadcastStateChanges={this.props.doNotBroadcastStateChanges} isCompact={this.props.isCompact} onStateChange={this.handleStateChange} />
            );
        }
        else if (this.props.item.type === 'Dimmer') {
            device = (
                <Dimmer item={this.props.item} doNotBroadcastStateChanges={this.props.doNotBroadcastStateChanges} isCompact={this.props.isCompact} onStateChange={this.handleStateChange} />
            );
        }
        else {
            device = (
                <div className="device">Generic - {this.props.item.name}</div>
            );
        }

        return (
          <div>
            {device}
          </div>
        );
    }
});

module.exports = Device;