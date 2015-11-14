var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var ruleStore = require('stores/ruleStore');
var actions = require('actions/actions');
var _ = require('lodash');
var EditRuleDefinitionList = require('components/rules/editRuleDefinition/editRuleDefinitionList');
var EditRuleActionList = require('components/rules/editRuleAction/editRuleActionList');

var EditRule = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(ruleStore, "rule", function(rulesObj) {

                var rule = _.find(rulesObj.rules, { id: this.props.params.id });

                return _.clone(rule, true) || this.getInitialState().rule;
            })
    ],


    getInitialState: function() {
        return {
            rule: {
                id: '',
                name: '',
                description: '',
                ruleDefinitions: [],
                action: {
                    deviceStates: []
                }
            }
        };
    },

    componentWillMount: function() {
        actions.loadRules();
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.rule.name = e.target.value;
        this.setState({rule: this.state.rule});
    },

    handleDescriptionChange: function(e) {
        this.state.rule.description = e.target.value;
        this.setState({rule: this.state.rule});
    },

    handleSave: function(e) {
        e.preventDefault();

        var rule = {
            id: this.state.rule.id,
            name: this.refs.name.value.trim(),
            description: this.refs.description.value.trim(),
            ruleDefinitions: this.state.rule.ruleDefinitions,
            action: this.state.rule.action
        };

        actions.saveRule(rule);
        this.history.pushState(null, '/rules');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/rules');
    },

    // According to react, the state should be managed by a common parent.  So, this component has to handle all updates, even those that come from
    // individual rule definitions.  Not sure how I feel about this, but trying.
    handleRuleDefinitionUpdate: function(ruleDefinitions) {
        this.state.rule.ruleDefinitions = ruleDefinitions;
        this.setState({ rule: this.state.rule });
    },

    handleRuleDefinitionAdd: function(newRuleDef) {
        this.state.rule.ruleDefinitions.push(newRuleDef);
        this.setState({ rule: this.state.rule });
    },

    handleRuleActionUpdate: function(ruleAction) {
        this.state.rule.action = ruleAction;
        this.setState({ rule: this.state.rule });
    },

    render: function () {

        if (!this.state.rule.action) this.state.rule.action = { deviceStates: [] };

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.rule.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                   <div className="form-group">
                    <label>Description
                    <input className="form-control" type="text" ref="description"  value={this.state.rule.description} onChange={this.handleDescriptionChange} required />
                    </label>
                </div>
                <div>
                    <EditRuleDefinitionList ruleDefinitions={this.state.rule.ruleDefinitions} onUpdate={this.handleRuleDefinitionUpdate} onAdd={this.handleRuleDefinitionAdd} />
                </div>
                <div>
                    <EditRuleActionList ruleAction={this.state.rule.action} onUpdate={this.handleRuleActionUpdate} />
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditRule;
