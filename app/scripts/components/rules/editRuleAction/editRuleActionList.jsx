var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var classNames = require('classnames');
var actions = require('actions/actions');
var deviceStore = require('stores/deviceStore');
var thermostatStore = require('stores/thermostatStore');
var userStore = require('stores/userStore');
var sonosStore = require('stores/sonosStore');
var EditRuleAction = require('components/rules/editRuleAction/editRuleAction');

// List of editable rule actions for edit rule page
var EditRuleActionList = React.createClass({
    
    mixins: [Reflux.listenTo(deviceStore, 'onDevicesLoaded'),
             Reflux.listenTo(userStore, 'onUsersLoaded'),
             Reflux.listenTo(thermostatStore, 'onThermostatsLoaded'),
             Reflux.listenTo(sonosStore, 'onSonosesLoaded')],

    ruleActionTypes: [
        { 
            actionType: 'Light',
            deviceState: {
                internalName: '',
                state: 'OFF'
            },
            config: {
                text: 'Light',
                icon: 'fa-lightbulb-o'
            }
        },
        {
            actionType: 'EmailAsText',
            userId: '',
            message: '',
            config: {
                text: 'Text',
                icon: 'fa-mobile'
            }
        },
        {
            actionType: 'Temperature',
            deviceState: {
                internalName: '',
                state: '65'
            },
            config: {
                text: 'Temp',
                icon: 'fa-fire'
            }
        },
        {
            actionType: 'Sonos',
            name: '',
            commandType: 'Favorite',
            parameter: '',
            config: {
                text: 'Sonos',
                icon: 'fa-music'
            }
        }
    ],

    getInitialState: function() {
        return {
            devices: [],
            thermostats: [],
            users: [],
            sonoses: []
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
        actions.loadThermostats();
        actions.loadUsers();
        actions.loadSonoses();
    },

    onDevicesLoaded: function(devices) {
        // Default for adding a new row and not changing anything
        this.ruleActionTypes[0].deviceState.internalName = devices[0].internalName;
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    onThermostatsLoaded: function(thermostatsObj) {
        // Default for adding a new row and not changing anything
        // TODO: make this work for AC or Heat
        this.ruleActionTypes[2].deviceState.internalName = thermostatsObj.thermostats[0].heatSetPoint.internalName;
        this.state.thermostats = thermostatsObj.thermostats;
        this.setState({ thermostats: this.state.thermostats });
    },

    onUsersLoaded: function(usersObj) {
        // Default for adding a new row and not changing anything
        this.ruleActionTypes[1].userId = usersObj.users[0].id;
        this.state.users = usersObj.users;
        this.setState({ users: this.state.users });
    },

    onSonosesLoaded: function(sonosObj) {
        this.ruleActionTypes[3].name = sonosObj.sonoses[0].name;
        this.ruleActionTypes[3].parameter = sonosObj.sonoses[0].favorites[0];
        this.state.sonoses = sonosObj.sonoses;
        this.setState({ sonoses: this.state.sonoses });
    },

    addNew: function(ruleAction) {
        var newAction = _.clone(ruleAction, true);
        delete newAction.config;

        this.props.onAdd(newAction);
    },

    handleRuleActionChange: function(ruleAction, index) {
        this.props.ruleActions[index] = ruleAction;
        this.props.onUpdate(this.props.ruleActions);
    },

    handleRuleActionDelete: function(index) {
        this.props.ruleActions.splice(index, 1);
        this.props.onUpdate(this.props.ruleActions);
    },

    render: function () {

        var markup = (this.props.ruleActions || []).map((ruleAction, index) => {

            return (
                <div className="rule-action">
                    <div className="rule-action-delete">
                        <a className="btn btn-link" onClick={this.handleRuleActionDelete.bind(this, index)}>
                            <i className="fa fa-times" />
                        </a>
                    </div>
                    <div className="rule-action-edit">
                        <EditRuleAction devices={this.state.devices} thermostats={this.state.thermostats} users={this.state.users} sonoses={this.state.sonoses}
                                        ruleAction={ruleAction} ruleIndex={index} onUpdate={this.handleRuleActionChange} />
                    </div>
                </div>
            );
        });

        var addMarkup = this.ruleActionTypes.map((ruleActionType) => {

            var classObj = {
                fa: true,
                'fa-2x': true
            };

            classObj[ruleActionType.config.icon] = true;

            var classes =  classNames(classObj);

            return (
                <a className="btn btn-success" onClick={this.addNew.bind(this, ruleActionType) }>
                    <i className={classes} />
                </a>
            );
        });


        return (
            <div className="rule-action-list">
                <h3>Actions</h3>
                {markup}
                <div className="rule-action-add">
                    <i className="add-icon fa fa-plus" />
                    {addMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditRuleActionList;