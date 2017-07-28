// List of editable rule definitions for edit rule page
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices } from '../../../actions/device.actions'
import { fetchUsers } from '../../../actions/user.actions'
import { addRuleDefinition, deleteRuleDefinition, editRuleDefinition } from '../../../actions/ruleDetails.actions'
import EditRuleDefinition from './editRuleDefinition'

class EditRuleDefinitionList extends Component {

    constructor(props) {
        super(props);

        this.handleRuleDefinitionChange = this.handleRuleDefinitionChange.bind(this);
        this.handleRuleDefinitionDelete = this.handleRuleDefinitionDelete.bind(this);

        this.ruleDefinitionTypes = [
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
        },
        {
            ruleType: 'Time',
            timeRuleType: 'Between',
            start: '00:00:00',
            end: '01:00:00',
            config: {
                text: 'Time',
                icon: 'fa-clock-o'
            }
        },
        {
            ruleType: 'Day',
            days: [],
            config: {
                text: 'Day',
                icon: 'fa-calendar'
            }
        }
        ];
    }

    componentWillMount() {
        this.props.fetchDevices();
        this.props.fetchUsers();
    }

    componentWillReceiveProps(nextProps) {
        // Default for adding a new row and not changing anything
        if (nextProps.devices.length) {
            this.ruleDefinitionTypes[0].lightState.internalName = nextProps.devices[0].internalName;
        }

        if (nextProps.users.length) {
            this.ruleDefinitionTypes[1].userState.userId = nextProps.users[0].id;
        }
    }

    addNew(ruleDef) {
        var newRuleDef = _.clone(ruleDef, true);
        delete newRuleDef.config;

        this.props.addRuleDefinition(newRuleDef);
    }

    handleRuleDefinitionChange(ruleDef, index) {
        this.props.editRuleDefinition(ruleDef, index);
    }

    handleRuleDefinitionDelete(index) {
        this.props.deleteRuleDefinition(index);
    }

    render () {

        var markup = this.props.ruleDefinitions.map((ruleDef, index) => {

            return (
                <div className="rule-definition">
                    <div className="rule-definition-delete">
                        <a className="btn btn-link" onClick={this.handleRuleDefinitionDelete.bind(this, index)}>
                            <i className="fa fa-times" />
                        </a>
                    </div>
                    <div className="rule-definition-edit">
                        <EditRuleDefinition users={this.props.users} devices={this.props.devices} ruleDefinition={ruleDef} ruleIndex={index} onUpdate={this.handleRuleDefinitionChange} />
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
                <h3>Triggers</h3>
                {markup}
                <div className="rule-definition-add">
                    <i className="add-icon fa fa-plus" />
                    {addMarkup}
                </div>
            </div>
            );
    }
}

export default connect((state) => ({
    devices: state.devices.items,
    users: state.users.items
}), {
  addRuleDefinition,
  deleteRuleDefinition,
  editRuleDefinition, 
  fetchDevices,
  fetchUsers
})(EditRuleDefinitionList)
