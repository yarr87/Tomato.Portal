import React, { Component } from 'react'
import EditLightRule from './editLightRule'
import EditUserRule from './editUserRule'
import EditTimeRule from './editTimeRule'
import EditDayRule from './editDayRule'

// Edit a single rule definition.  Most of the logic will be done in a specific subclass (EditLightRule, EditUserRule, etc)
export default class EditRuleDefinition extends Component {

    constructor(props) {
        super(props);

        this.handleRuleDefinitionChange = this.handleRuleDefinitionChange.bind(this);
    }
    
    handleRuleDefinitionChange(ruleDef) {
        this.props.onUpdate(ruleDef, this.props.ruleIndex);
    }

    render() {

        var ruleDef = this.props.ruleDefinition;

        var def;

        if (ruleDef.ruleType === 'Light') {
            def = (<EditLightRule devices={this.props.devices} lightRule={ruleDef} onUpdate={this.handleRuleDefinitionChange} />);
        }
        else if (ruleDef.ruleType === 'User') {
            def = (<EditUserRule users={this.props.users} userRule={ruleDef} onUpdate={this.handleRuleDefinitionChange} />);
        }
        else if (ruleDef.ruleType === 'Time') {
            def = (<EditTimeRule timeRule={ruleDef} onUpdate={this.handleRuleDefinitionChange} />);
        }
        else if (ruleDef.ruleType === 'Day') {
            def = (<EditDayRule dayRule={ruleDef} onUpdate={this.handleRuleDefinitionChange} />);
        }
        else {
            def = (<div>{ruleDef.ruleType}</div>);
        }

        return def;
    }
}
