var React = require('react');

// Edit a single light rule definition
var EditLightRule = React.createClass({
    
    getInitialState: function() {
        return {
            lightRule: this.props.lightRule
        }
    },

    render: function () {

        var selectedLight = this.props.lightRule.lightState.internalName;

        // Options for the device select
        var deviceOptions = (this.props.devices || []).map((device) => {
            return (
                <option key={device.id} value={device.internalName}>{device.name}</option>
            );
        });

        var deviceMarkup = (
            <select className="form-control" value={selectedLight}>
                {deviceOptions}
            </select>
        );      

        return (
            <div>
                {deviceMarkup} {this.state.lightRule.lightState.state}
            </div>
            );
    }
});

module.exports = EditLightRule;