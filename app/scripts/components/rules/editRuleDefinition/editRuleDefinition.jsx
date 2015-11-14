var React = require('react');
var Reflux = require('reflux');
var EditLightRule = require('components/rules/editRuleDefinition/editLightRule');
var EditUserRule = require('components/rules/editRuleDefinition/editUserRule');

// Edit a single rule definition.  Most of the logic will be done in a specific subclass (EditLightRule, EditUserRule, etc)
var EditRuleDefinition = React.createClass({
    
    handleRuleDefinitionChange: function(ruleDef) {
        this.props.onUpdate(ruleDef, this.props.index);
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
        else {
            def = (<div>{ruleDef.ruleType}</div>);
        }

        return def;
    }
});

module.exports = EditRuleDefinition;