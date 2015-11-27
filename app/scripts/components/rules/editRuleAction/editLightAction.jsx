var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Device = require('components/devices/device');

// Edit a single light state action for a rule
var EditLightAction = React.createClass({

    availableStates: [
        { id: "state_on", name: "turn on", state: "ON" },
        { id: "state_off", name: "turn off", state: "OFF" }
    ],

    handleDeviceChange: function(e) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.internalName = e.target.value;

        this.props.onUpdate(ruleAction);
    },

    handleStateChange: function(e) {
        var ruleAction = this.props.ruleAction;

        var selectedState = _.find(this.availableStates, { id: e.target.value });

        ruleAction.deviceState.state = selectedState.state;

        this.props.onUpdate(ruleAction);
    },

    render: function () {

        var selectedLight = this.props.ruleAction.deviceState.internalName;

        // Options for the device select
        var deviceOptions = (this.props.devices || []).map((device) => {
            return (
                <option key={device.id} value={device.internalName}>{device.name}</option>
            );
        });

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.ruleAction.deviceState.state === availableState.state;
        }) || {};

        var stateOptions = this.availableStates.map((availableState) => {
            return (
                <option key={availableState.id} value={availableState.id}>{availableState.name}</option>
            );
        })

        var deviceMarkup = (
            <select className="form-control" value={selectedLight} onChange={this.handleDeviceChange}>
                {deviceOptions}
            </select>
        ); 

        var stateMarkup = (
            <select className="form-control" value={selectedState.id} onChange={this.handleStateChange}>
                {stateOptions}
            </select>
        );

        return (
            <div className="row rule-definition">
                <div className="col-xs-6">
                    {stateMarkup}
                </div>
                <div className="col-xs-6">
                    {deviceMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditLightAction;