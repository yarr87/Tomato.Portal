var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var classNames = require('classnames');
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
                state: 'OFF',
                isTriggered: false
            },
            config: {
                text: 'Light',
                icon: 'fa-lightbulb-o'
            }
        },
        {
            ruleType: 'User',
            userState:
            {
                userId: '',
                isHome: false,
                isTriggered: false
            },
            config: {
                text: 'User',
                icon: 'fa-user'
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
        // Default for adding a new row and not changing anything
        this.ruleDefinitionTypes[0].lightState.internalName = devices[0].internalName;
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    onUsersLoaded: function(usersObj) {
        // Default for adding a new row and not changing anything
        this.ruleDefinitionTypes[1].userState.userId = usersObj.users[0].id;
        this.state.users = usersObj.users;
        this.setState({ users: this.state.users });
    },

    addNew: function(ruleDef) {
        var newRuleDef = _.clone(ruleDef, true);
        delete newRuleDef.config;

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
                        <a className="btn btn-link" onClick={this.handleRuleDefinitionDelete.bind(this, index)}>
                            <i className="fa fa-times" />
                        </a>
                    </div>
                    <div className="rule-definition-edit">
                        <EditRuleDefinition users={this.state.users} devices={this.state.devices} ruleDefinition={ruleDef} ruleIndex={index} onUpdate={this.handleRuleDefinitionChange} />
                    </div>
                </div>
            );
        });

        var addMarkup = this.ruleDefinitionTypes.map((ruleDef) => {

            var classObj = {
                fa: true,
                'fa-2x': true
            };

            classObj[ruleDef.config.icon] = true;

            var classes =  classNames(classObj);

            return (
                <a className="btn btn-success" onClick={this.addNew.bind(this, ruleDef) }>
                    <i className={classes} />
                </a>
            );
        });

        return (
            <div className="rule-definition-list">
                <h3>Rule Definitions</h3>
                {markup}
                <div className="rule-definition-add">
                    <i className="add-icon fa fa-plus" />
                    {addMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditRuleDefinitionList;