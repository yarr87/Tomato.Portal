var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

// Edit a single rule action.  Most of the logic will be done in a specific subclass (EditLightAction, etc)
var Thermostat = React.createClass({
    
    handleActionChange: function(ruleAction) {
        this.props.onUpdate(ruleAction, this.props.index);
    },

    render: function () {

        var thermostat = this.props.thermostat;

        // TODO: finish this page
        // TODO: on save, some stuff is set on the server so this component breaks until the page is refreshed

        return (
            <div>
                Heat Set Point: {thermostat.heatSetPoint.state}
            </div>
        );

        var markup;

        if (ruleAction.actionType === 'Light') {
            markup = (<EditLightAction devices={this.props.devices} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'EmailAsText') {
            markup = (<EditEmailAsTextAction users={this.props.users} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'Temperature') {
            // TODO: handle multiple thermostats
            var hvac = _.find(this.props.devices, { type: 'Temperature' });
            if (hvac) {
                ruleAction.deviceState.internalName = hvac.internalName;
            }
            markup = (<EditTemperatureAction device={hvac} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else {
            markup = (<div>{ruleAction.actionType}</div>);
        }

        return markup;
    }
});

module.exports = Thermostat;