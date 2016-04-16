import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices } from '../../../actions'
import { fetchUsers } from '../../../actions/user.actions'
import { fetchThermostats } from '../../../actions/thermostat.actions'
import { fetchSonoses } from '../../../actions/sonos.actions'
import { addRuleAction, deleteRuleAction, editRuleAction } from '../../../actions/ruleDetails.actions'
import EditRuleAction from './editRuleAction'

// List of editable rule actions for edit rule page
class EditRuleActionList extends Component {
    
    constructor(props) {
        super(props);

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
        if (nextProps.devices.length) {
            this.ruleActionTypes[0].deviceState.internalName = nextProps.devices[0].internalName;
        }

        if (nextProps.users.length) {
            this.ruleActionTypes[1].userId = nextProps.users[0].id;
        }

        if (nextProps.thermostats.length) {
            // TODO: make this work for AC or Heat
            this.ruleActionTypes[2].deviceState.internalName = nextProps.thermostats[0].heatSetPoint.internalName;
        }

        if (nextProps.sonoses.length) {
            this.ruleActionTypes[3].name = nextProps.sonoses[0].name;
            this.ruleActionTypes[3].parameter = nextProps.sonoses[0].favorites[0];
        }
    }

    addNew(ruleAction) {
        var newAction = _.clone(ruleAction, true);
        delete newAction.config;

        this.props.addRuleAction(newAction);
    }

    handleRuleActionChange(ruleAction, index) {
        this.props.editRuleAction(ruleAction, index);
    }

    handleRuleActionDelete(index) {
        this.props.deleteRuleAction(index);
    }

    render () {

        var markup = (this.props.ruleActions || []).map((ruleAction, index) => {

            return (
                <div className="rule-action">
                    <div className="rule-action-delete">
                        <a className="btn btn-link" onClick={this.handleRuleActionDelete.bind(this, index)}>
                            <i className="fa fa-times" />
                        </a>
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
    addRuleAction,
    deleteRuleAction,
    editRuleAction,
    fetchDevices,
    fetchUsers,
    fetchThermostats,
    fetchSonoses
})(EditRuleActionList)