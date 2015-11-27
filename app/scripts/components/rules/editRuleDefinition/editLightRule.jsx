var React = require('react');
var _ = require('lodash');

// Edit a single light rule definition
var EditLightRule = React.createClass({

    availableStates: [
        { id: "state_on", name: "is on", state: "ON", isTriggered: false },
        { id: "state_off", name: "is off", state: "OFF", isTriggered: false },
        { id: "turns_on", name: "turns on", state: "ON", isTriggered: true },
        { id: "turns_off", name: "turns off", state: "OFF", isTriggered: true }
    ],

    handleDeviceChange: function(e) {
        var lightRule = this.props.lightRule;

        lightRule.lightState.internalName = e.target.value;

        this.props.onUpdate(lightRule);
    },

    handleStateChange: function(e) {
        var lightRule = this.props.lightRule;

        var selectedState = _.find(this.availableStates, { id: e.target.value });

        lightRule.lightState.state = selectedState.state;
        lightRule.isTriggered = selectedState.isTriggered; 

        this.props.onUpdate(lightRule);
    },

    render: function () {

        var selectedLight = this.props.lightRule.lightState.internalName;

        // Options for the device select
        var deviceOptions = (this.props.devices || []).map((device) => {
            return (
                <option key={device.id} value={device.internalName}>{device.name}</option>
            );
        });

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.lightRule.lightState.state === availableState.state && this.props.lightRule.isTriggered === availableState.isTriggered;
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
                    {deviceMarkup}
                </div>
                <div className="col-xs-6">
                    {stateMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditLightRule;