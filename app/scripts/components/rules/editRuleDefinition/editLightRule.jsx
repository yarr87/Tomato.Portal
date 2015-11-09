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

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.state.lightRule.lightState.state === availableState.state && this.state.lightRule.isTriggered === availableState.isTriggered;
        }) || {};

        var stateOptions = this.availableStates.map((availableState) => {
            return (
                <option key={availableState.id} value={availableState.id}>{availableState.name}</option>
            );
        })

        var deviceMarkup = (
            <select className="form-control" value={selectedLight}>
                {deviceOptions}
            </select>
        ); 

        var stateMarkup = (
            <select className="form-control" value={selectedState.id}>
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