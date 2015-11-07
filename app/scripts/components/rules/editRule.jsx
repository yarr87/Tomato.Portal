var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var ruleStore = require('stores/ruleStore');
var actions = require('actions/actions');
var _ = require('lodash');
var EditRuleDefinitionList = require('components/rules/editRuleDefinition/editRuleDefinitionList');

var EditRule = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(ruleStore, "rule", function(rulesObj) {

                var rule = _.find(rulesObj.rules, { id: this.props.params.id });

                return rule || this.getInitialState().rule;
            })
    ],


    getInitialState: function() {
        return {
            rule: {
                id: '',
                name: '',
                description: '',
                ruleDefinitions: [],
                actions: []
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
            description: this.refs.description.value.trim()
        };

        actions.saveRule(rule);
        this.history.pushState(null, '/rules');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/rules');
    },

    render: function () {

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
                    <EditRuleDefinitionList ruleDefinitions={this.state.rule.ruleDefinitions} />
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
