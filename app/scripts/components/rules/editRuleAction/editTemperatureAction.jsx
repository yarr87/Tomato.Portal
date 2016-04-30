import React, { Component } from 'react'
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit temperature action for a rule
export default class EditTemperatureAction extends Component {

    constructor(props) {
        super(props);

        this.handleTempChange = this.handleTempChange.bind(this);
        this.handleThermostatChange = this.handleThermostatChange.bind(this);
    }

    getTemperatureOptions() {
        var temps = [];

        for(var i = 55; i <= 75; i ++) {
            temps.push({value: i.toString(), label: i });
        }

        return temps;
    }
    
    handleTempChange(newTemp) {
        var ruleAction = this.props.ruleAction;

        ruleAction.temperature = newTemp;

        this.props.onUpdate(ruleAction);
    }

    handleThermostatChange(newThermostatId) {
        var ruleAction = this.props.ruleAction;

        ruleAction.thermostatId = newThermostatId;    

        this.props.onUpdate(ruleAction);
    }

    render () {

        var selectedTemp = this.props.ruleAction.temperature;
        var selectedThermostat = this.props.ruleAction.thermostatId;

        var thermostatSelections = (this.props.thermostats || []).map((thermostat) => {
            return { value: thermostat.id, label: thermostat.name };
        });

        var tempOptions = this.getTemperatureOptions();

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    Set 
                    <Picker options={thermostatSelections} selectedValue={selectedThermostat} onChange={this.handleThermostatChange} />
                    to
                    <Picker options={tempOptions} selectedValue={selectedTemp} onChange={this.handleTempChange} />
                </div>
            </div>
            );
    }
}