var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit temperature action for a rule
var EditTemperatureAction = React.createClass({

    getTemperatureOptions: function() {
        var temps = [];

        for(var i = 55; i <= 75; i ++) {
            temps.push({value: i.toString(), label: i });
        }

        return temps;
    },
    
    handleTempChange: function(newTemp) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.state = newTemp;

        this.props.onUpdate(ruleAction);
    },

    handleThermostatChange: function(newThermostatInternalName) {
        var ruleAction = this.props.ruleAction;

        ruleAction.deviceState.internalName = newThermostatInternalName;    

        this.props.onUpdate(ruleAction);
    },

    render: function () {

        var selectedTemp = this.props.ruleAction.deviceState.state;
        var selectedThermostat = this.props.ruleAction.deviceState.internalName;

        var thermostatSelections = (this.props.thermostats || []).map((thermostat) => {
            // TODO: handle coolSetPoint too
            return { value: thermostat.heatSetPoint.internalName, label: thermostat.name };
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
});

module.exports = EditTemperatureAction;