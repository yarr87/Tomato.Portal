var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single light state action for a rule
var EditLightAction = React.createClass({

    availableStates: [
        { id: "state_on", name: "turn on", state: "ON" },
        { id: "state_off", name: "turn off", state: "OFF" }
    ],

    handleDeviceChange: function(newDeviceInternalName) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.internalName = newDeviceInternalName;

        this.props.onUpdate(ruleAction);
    },

    handleStateChange: function(newStateId) {
        var ruleAction = this.props.ruleAction;

        var selectedState = _.find(this.availableStates, { id: newStateId });

        ruleAction.deviceState.state = selectedState.state;

        this.props.onUpdate(ruleAction);
    },

    render: function () {

        var selectedLight = this.props.ruleAction.deviceState.internalName;

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.ruleAction.deviceState.state === availableState.state;
        }) || this.availableStates[0];

        var stateSelections = this.availableStates.map((availableState) => {
            return { value: availableState.id, label: availableState.name }
        });

        var deviceSelections = (this.props.devices || []).map((device) => {
            return { value: device.internalName, label: device.name };
        });

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    <Picker options={stateSelections} selectedValue={selectedState.id} onChange={this.handleStateChange} />
                    <Picker options={deviceSelections} selectedValue={selectedLight} onChange={this.handleDeviceChange} />
                </div>
            </div>
            );
    }
});

module.exports = EditLightAction;