var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var actions = require('actions/actions');
var deviceStore = require('stores/deviceStore');
var userStore = require('stores/userStore');
var EditRuleDefinition = require('components/rules/editRuleDefinition/editRuleDefinition');

// List of editable rule definitions for edit rule page
var EditRuleDefinitionList = React.createClass({
    
    mixins: [Reflux.listenTo(deviceStore, 'onDevicesLoaded'),
             Reflux.listenTo(userStore, 'onUsersLoaded')],

    ruleDefinitionTypes: [
        { 
            ruleType: 'Light',
            lightState: 
            { 
                internalName: '',
                state: '',
                isTriggered: false
            }
        },
        {
            ruleType: 'User',
            userState:
            {
                userId: '',
                isHome: false,
                isTriggered: false
            }
        }
    ],

    getInitialState: function() {
        return {
            devices: [],
            users: []
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
        actions.loadUsers();
    },

    onDevicesLoaded: function(devices) {
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    onUsersLoaded: function(usersObj) {
        this.state.users = usersObj.users;
        this.setState({ users: this.state.users });
    },

    addNew: function(ruleDef) {
        var newRuleDef = _.clone(ruleDef, true);
        this.props.onAdd(newRuleDef);
    },

    handleRuleDefinitionChange: function(ruleDef, index) {
        this.props.ruleDefinitions[index] = ruleDef;
        this.props.onUpdate(this.props.ruleDefinitions);
    },

    handleRuleDefinitionDelete: function(index) {
        this.props.ruleDefinitions.splice(index, 1);
        this.props.onUpdate(this.props.ruleDefinitions);
    },

    render: function () {

        var markup = this.props.ruleDefinitions.map((ruleDef, index) => {

            return (
                <div className="rule-definition">
                    <div className="rule-definition-delete">
                        <a className="btn btn-link" onClick={this.handleRuleDefinitionDelete.bind(this, index)}>X</a>
                    </div>
                    <div className="rule-definition-edit">
                        <EditRuleDefinition users={this.state.users} devices={this.state.devices} ruleDefinition={ruleDef} ruleIndex={index} onUpdate={this.handleRuleDefinitionChange} />
                    </div>
                </div>
            );
        });

        var addMarkup = this.ruleDefinitionTypes.map((ruleDef) => {
            return (<a className="btn btn-link" onClick={this.addNew.bind(this, ruleDef) }>+{ruleDef.ruleType}</a>);
        });

        return (
            <div>
                <h3>Rule Definitions</h3>
                {markup}
                <div className="rule-definition-add">
                    {addMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditRuleDefinitionList;