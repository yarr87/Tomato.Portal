var React = require('react');
var Reflux = require('reflux');
var EditLightRule = require('components/rules/editRuleDefinition/editLightRule');
var EditUserRule = require('components/rules/editRuleDefinition/editUserRule');
var EditTimeRule = require('components/rules/editRuleDefinition/editTimeRule');
var EditDayRule = require('components/rules/editRuleDefinition/editDayRule');

// Edit a single rule definition.  Most of the logic will be done in a specific subclass (EditLightRule, EditUserRule, etc)
var EditRuleDefinition = React.createClass({
    
    handleRuleDefinitionChange: function(ruleDef) {
        this.props.onUpdate(ruleDef, this.props.ruleIndex);
    },

    render: function () {

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
});

module.exports = EditRuleDefinition;