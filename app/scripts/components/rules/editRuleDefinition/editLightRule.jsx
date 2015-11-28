var React = require('react');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single light rule definition
var EditLightRule = React.createClass({

    availableStates: [
        { id: "state_on", name: "is on", state: "ON", isTriggered: false },
        { id: "state_off", name: "is off", state: "OFF", isTriggered: false },
        { id: "turns_on", name: "turns on", state: "ON", isTriggered: true },
        { id: "turns_off", name: "turns off", state: "OFF", isTriggered: true }
    ],

    handleDeviceChange: function(newDeviceInternalName) {
        var lightRule = this.props.lightRule;

        lightRule.lightState.internalName = newDeviceInternalName;

        this.props.onUpdate(lightRule);
    },

    handleStateChange: function(newStateId) {
        var lightRule = this.props.lightRule;

        var selectedState = _.find(this.availableStates, { id: newStateId });

        lightRule.lightState.state = selectedState.state;
        lightRule.isTriggered = selectedState.isTriggered; 

        this.props.onUpdate(lightRule);
    },

    render: function () {

        var selectedLight = this.props.lightRule.lightState.internalName;

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.lightRule.lightState.state === availableState.state && this.props.lightRule.isTriggered === availableState.isTriggered;
        }) || this.availableStates[0];

        var deviceSelections = (this.props.devices || []).map((device) => {
            return { value: device.internalName, label: device.name };
        });

        var stateSelections = this.availableStates.map((availableState) => {
            return { value: availableState.id, label: availableState.name };
        });

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Picker options={deviceSelections} selectedValue={selectedLight} onChange={this.handleDeviceChange} />
                    <Picker options={stateSelections} selectedValue={selectedState.id} onChange={this.handleStateChange} />
                </div>
            </div>
            );
    }
});

module.exports = EditLightRule;