import React, { Component } from 'react'
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single light state action for a rule
export default class EditLightAction extends Component {

    constructor(props) {
        super(props);

        this.handleDeviceChange = this.handleDeviceChange.bind(this);
        this.handleDimmerLevelChange = this.handleDimmerLevelChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

        this.availableStates = [
            {id: "state_on", name: "turn on", state: "ON"},
            {id: "state_off", name: "turn off", state: "OFF"}
        ];
    }

    getDimmerLevels() {
        var levels = [];

        for(var i = 0; i <= 100; i += 10) {
            levels.push({value: i.toString(), label: i + '%' });
        }

        return levels;
    }

    handleDeviceChange(newDeviceInternalName) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.internalName = newDeviceInternalName;    

        var device = _.find(this.props.devices || [], (d) => { return d.internalName === ruleAction.deviceState.internalName });

        // If changing from a dimmer to a switch, make sure the state is valid
        if (device && device.type !== 'Dimmer' && ruleAction.deviceState.state !== 'ON' && ruleAction.deviceState.state !== 'OFF') {
            ruleAction.deviceState.state = 'ON';
        }
        else if (device && device.type === 'Dimmer' && (ruleAction.deviceState.state === 'ON' || ruleAction.deviceState.state === 'OFF')) {
            ruleAction.deviceState.state = '0';
        }

        this.props.onUpdate(ruleAction);
    }

    handleDimmerLevelChange(newDimmerLevel) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.state = newDimmerLevel;

        this.props.onUpdate(ruleAction);
    }

    handleStateChange(newStateId) {
        var ruleAction = this.props.ruleAction;

        var selectedState = _.find(this.availableStates, { id: newStateId });

        ruleAction.deviceState.state = selectedState.state;

        this.props.onUpdate(ruleAction);
    }

    render () {

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

        var device = _.find(this.props.devices || [], (d) => { return d.internalName === selectedLight });

        var isDimmer = device && device.type === 'Dimmer';
        var dimmerState = this.props.ruleAction.deviceState.state;

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    <Picker options={stateSelections} selectedValue={selectedState.id} onChange={this.handleStateChange} />
                    <Picker options={deviceSelections} selectedValue={selectedLight} onChange={this.handleDeviceChange} />
                    {isDimmer ? <Picker options={this.getDimmerLevels()} selectedValue={dimmerState} onChange={this.handleDimmerLevelChange} /> : '' }
                </div>
            </div>
            );
    }
}