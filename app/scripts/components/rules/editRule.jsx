import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchRules, updateRule } from '../../actions/rule.actions'
import { initializeRuleDetails } from '../../actions/ruleDetails.actions'
import { hashHistory } from 'react-router'
import EditRuleDefinitionList from './editRuleDefinition/editRuleDefinitionList'
import EditRuleActionList from './editRuleAction/editRuleActionList'

class EditRule extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.props.fetchRules();
        this.props.initializeRuleDetails(this.props.routeParams.id);
    }

     handleSave(values) {

        var rule = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            description: values.description.trim(),
            isDisabled: values.isDisabled,
            ruleDefinitions: this.props.ruleDetails.ruleDefinitions,
            actions: this.props.ruleDetails.actions
        };

        this.props.dispatch(updateRule(rule));
        hashHistory.push('/rules');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/rules');
    }

    render () {

        const {fields: {name, description, isDisabled }, handleSubmit, ruleDetails} = this.props;

        var isEnabled = Object.assign({}, isDisabled);
        isEnabled.value = !isDisabled.value;
        isEnabled.checked = !isDisabled.checked;

        return (
            <div className="row">
            <div className="col-md-6">
            <form onSubmit={ handleSubmit(this.handleSave) }>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" required {...name} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description
                    <textarea className="form-control" type="text" ref="description"  {...description} />
                    </label>
                </div>
                <div className="form-group">
                    <label for="chkDisabled">Enabled? &nbsp;
                    <input id="chkDisabled" type="checkbox" {...isEnabled} />
                    </label>
                </div>
                <div>
                    <EditRuleDefinitionList ruleDefinitions={ruleDetails.ruleDefinitions} />
                </div>
                <div>
                    <EditRuleActionList ruleActions={ruleDetails.actions} />
                </div>
                <div className="form-group btn-toolbar">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

}

EditRule = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'rule',                           // a unique name for this form
  fields: ['name', 'description', 'isDisabled'] // all the fields in your form
},
// TODO: use ruleDetails in state instead, hook it up to child components
(state, ownProps) => ({
    initialValues: _.find(state.rules.items, { id: ownProps.routeParams.id }),
    ruleDetails: state.ruleDetails
}),
{
    fetchRules,
    initializeRuleDetails
})(EditRule);

export default EditRule