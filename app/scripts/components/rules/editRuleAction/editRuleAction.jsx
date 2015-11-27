var React = require('react');
var Reflux = require('reflux');
var EditLightAction = require('components/rules/editRuleAction/editLightAction');
var EditEmailAsTextAction = require('components/rules/editRuleAction/editEmailAsTextAction');

// Edit a single rule action.  Most of the logic will be done in a specific subclass (EditLightAction, etc)
var EditRuleAction = React.createClass({
    
    handleActionChange: function(ruleAction) {
        this.props.onUpdate(ruleAction, this.props.index);
    },

    render: function () {

        var ruleAction = this.props.ruleAction;

        var markup;

        if (ruleAction.actionType === 'Light') {
            markup = (<EditLightAction devices={this.props.devices} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else if (ruleAction.actionType === 'EmailAsText') {
            markup = (<EditEmailAsTextAction users={this.props.users} ruleAction={ruleAction} onUpdate={this.handleActionChange} />);
        }
        else {
            markup = (<div>{ruleAction.actionType}</div>);
        }

        return markup;
    }
});

module.exports = EditRuleAction;