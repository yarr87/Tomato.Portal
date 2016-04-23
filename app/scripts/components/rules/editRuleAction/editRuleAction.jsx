import React, { Component } from 'react'
import EditLightAction from './editLightAction'
import EditEmailAsTextAction from './editEmailAsTextAction'
import EditTemperatureAction from './editTemperatureAction'
import EditSonosAction from './editSonosAction'
import _ from 'lodash'

// Edit a single rule action.  Most of the logic will be done in a specific subclass (EditLightAction, etc)
export default class EditRuleAction extends Component {

    constructor(props) {
        super(props);

        this.handleActionChange = this.handleActionChange.bind(this);
    }
    
    handleActionChange(ruleAction) {
        this.props.onUpdate(ruleAction, this.props.ruleIndex);
    }

    render() {

        // Making a copy so we don't edit the prop and mess up change detection
        // Object.assign doesn't work - I don't think it handles deep properties correctly
        var ruleAction = _.cloneDeep(this.props.ruleAction);

        var markup;

        if (ruleAction.actionType === 'Light') {
            markup = (<EditLightAction devices={this.props.devices} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'EmailAsText') {
            markup = (<EditEmailAsTextAction users={this.props.users} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'Temperature') {
            markup = (<EditTemperatureAction thermostats={this.props.thermostats} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'Sonos') {
            markup = (<EditSonosAction sonoses={this.props.sonoses} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else {
            markup = (<div>{ruleAction.actionType}</div>);
        }

        return markup;
    }
}