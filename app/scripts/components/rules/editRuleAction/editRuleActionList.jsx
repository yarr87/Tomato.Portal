import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices } from '../../../actions/device.actions'
import { fetchUsers } from '../../../actions/user.actions'
import { fetchThermostats } from '../../../actions/thermostat.actions'
import { fetchSonoses } from '../../../actions/sonos.actions'
import EditRuleAction from './editRuleAction'
import Picker from '../../picker/picker'

// List of editable rule actions for edit rule page
class EditRuleActionList extends Component {
    
    constructor(props) {
        super(props);

        this.addNew = this.addNew.bind(this);
        this.handleRuleActionChange = this.handleRuleActionChange.bind(this);
        this.handleRuleActionDelete = this.handleRuleActionDelete.bind(this);

        this.ruleActionTypes = [
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
                thermostatId: '',
                temperature: '65',
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
            },
            {
                actionType: 'Delay',
                delay: '00:00:00',
                config: {
                    text: 'Delay',
                    icon: 'fa-pause'
                }
            }
        ];
    }

    componentWillMount() {
        this.props.fetchDevices();
        this.props.fetchUsers();
        this.props.fetchThermostats();
        this.props.fetchSonoses();
    }

    componentWillReceiveProps(nextProps) {
        // Default for adding a new row and not changing anything

        // TODO: when you add an item for the first time, this hasn't fired yet and it doesn't preselect.
        if (nextProps.devices.length) {
            this.ruleActionTypes[0].deviceState.internalName = nextProps.devices[0].internalName;
        }

        if (nextProps.users.length) {
            this.ruleActionTypes[1].userId = nextProps.users[0].id;
        }

        if (nextProps.thermostats.length) {
            this.ruleActionTypes[2].thermostatId = nextProps.thermostats[0].id;
        }

        if (nextProps.sonoses.length) {
            this.ruleActionTypes[3].name = nextProps.sonoses[0].name;
            this.ruleActionTypes[3].parameter = nextProps.sonoses[0].favorites[0];
        }
    }

    addNew(ruleAction) {
        var newAction = _.clone(ruleAction, true);
        delete newAction.config;

        var existing = this.props.ruleActions || [];

        // Assuming we are using the onChange property from redux-form
        this.props.onChange([...existing, newAction]);
    }

    handleRuleActionChange(ruleAction, index) {
        let ruleActions = this.props.ruleActions.slice(0, index)
          .concat([ruleAction])
          .concat(this.props.ruleActions.slice(index + 1));

        this.props.onChange(ruleActions);
    }

    handleRuleActionDelete(index) {
        let ruleActions = this.props.ruleActions.slice(0, index)
          .concat(this.props.ruleActions.slice(index + 1));

        this.props.onChange(ruleActions);
    }

    moveDown(index) {
        let ruleActions = this.props.ruleActions.slice(0, index)
            .concat([this.props.ruleActions[index + 1]])
            .concat([this.props.ruleActions[index]])
            .concat(this.props.ruleActions.slice(index + 2));

        this.props.onChange(ruleActions);
    }

    moveUp(index) {
        let ruleActions = this.props.ruleActions.slice(0, index - 1)
            .concat([this.props.ruleActions[index]])
            .concat([this.props.ruleActions[index - 1]])
            .concat(this.props.ruleActions.slice(index + 1));

        this.props.onChange(ruleActions);
    }

    handleAction(index, action) {
        if (action === 'delete') {
            this.handleRuleActionDelete(index);
        }
        else if (action === 'up') {
            this.moveUp(index);
        }
        else if (action === 'down') {
            this.moveDown(index);
        }
    }

    render () {

        // Actions that can be done on each row (will be filtered per row so first row doesn't get 'up', etc).
        // Bit of a hack, just using a <Picker> control with selectedValue='' as sort of a dropdown menu.
        var actions = [
            { label: 'delete', value: 'delete' },
            { label: 'move up', value: 'up' },
            { label: 'move down', value: 'down' },
            { label: '', value: '' }
        ];

        var lastIndex = (this.props.ruleActions || []).length;
        var markup = (this.props.ruleActions || []).map((ruleAction, index) => {

            // Remove up/down actions for first/last elements
            var availableActions = _.filter(actions, action => {
                if (action.value === 'up' && index === 0) {
                    return false;
                }
                else if (action.value === 'down' && index >= lastIndex) {
                    return false;
                }

                return true;
            });

            return (
                <div className="rule-action">
                
                    <div className="rule-action-dropdown">
                        <Picker isAction={true} options={availableActions} selectedValue={''} onChange={this.handleAction.bind(this, index)} />
                    </div>

                    <div className="rule-action-edit">
                        <EditRuleAction devices={this.props.devices} thermostats={this.props.thermostats} users={this.props.users} sonoses={this.props.sonoses}
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
}


export default connect((state) => ({
    devices: state.devices.items,
    users: state.users.items,
    thermostats: state.thermostats.items,
    sonoses: state.sonoses.items
}), {
    fetchDevices,
    fetchUsers,
    fetchThermostats,
    fetchSonoses
})(EditRuleActionList)