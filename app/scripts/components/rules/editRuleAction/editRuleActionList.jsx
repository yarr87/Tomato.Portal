var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var classNames = require('classnames');
var actions = require('actions/actions');
var deviceStore = require('stores/deviceStore');
var userStore = require('stores/userStore');
var EditRuleAction = require('components/rules/editRuleAction/editRuleAction');

// List of editable rule actions for edit rule page
var EditRuleActionList = React.createClass({
    
    mixins: [Reflux.listenTo(deviceStore, 'onDevicesLoaded'),
             Reflux.listenTo(userStore, 'onUsersLoaded')],

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
        this.ruleActionTypes[0].deviceState.internalName = devices[0].internalName;
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    onUsersLoaded: function(usersObj) {
        // Default for adding a new row and not changing anything
        this.ruleActionTypes[1].userId = usersObj.users[0].id;
        this.state.users = usersObj.users;
        this.setState({ users: this.state.users });
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
                        <EditRuleAction devices={this.state.devices} users={this.state.users} ruleAction={ruleAction} ruleIndex={index} onUpdate={this.handleRuleActionChange} />
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
                <h3>Rule Actions</h3>
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