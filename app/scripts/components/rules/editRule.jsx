var Link = require('globals').Router.Link;
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchRules, updateRule } from '../../actions/rule.actions'
import { initializeRuleDetails } from '../../actions/ruleDetails.actions'
import { hashHistory } from 'react-router'
var EditRuleDefinitionList = require('components/rules/editRuleDefinition/editRuleDefinitionList');
var EditRuleActionList = require('components/rules/editRuleAction/editRuleActionList');

class EditRule extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchRules())
        dispatch(initializeRuleDetails(this.props.routeParams.id))
    }

     handleSave(values) {

        var rule = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            description: values.description.trim(),
            isDisabled: !values.isDisabled,
            ruleDefinitions: this.props.rule.ruleDefinitions,
            actions: this.props.rule.actions
        };

        this.props.dispatch(updateRule(rule));
        hashHistory.push('/rules');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/rules');
    }

    // According to react, the state should be managed by a common parent.  So, this component has to handle all updates, even those that come from
    // individual rule definitions.  Not sure how I feel about this, but trying.
    handleRuleDefinitionUpdate(ruleDefinitions) {
        this.state.rule.ruleDefinitions = ruleDefinitions;
        this.setState({ rule: this.state.rule });
    }

    handleRuleDefinitionAdd(newRuleDef) {
        this.state.rule.ruleDefinitions.push(newRuleDef);
        this.setState({ rule: this.state.rule });
    }

    handleRuleActionUpdate(ruleActions) {
        this.state.rule.actions = ruleActions;
        this.setState({ rule: this.state.rule });
    }

    handleRuleActionAdd(newRuleAction) {
        if (!this.state.rule.actions) this.state.rule.actions = [];
        this.state.rule.actions.push(newRuleAction);
        this.setState({ rule: this.state.rule });
    }

    render () {

        const {fields: {name, description, isDisabled }, handleSubmit} = this.props;

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
                    <input id="chkDisabled" type="checkbox" {...isDisabled} checked={isDisabled.value ? '' : 'checked'} value={!isDisabled.value} />
                    </label>
                </div>
                <div>
                    <EditRuleDefinitionList ruleDefinitions={this.props.rule.ruleDefinitions || []} onUpdate={this.handleRuleDefinitionUpdate} onAdd={this.handleRuleDefinitionAdd} />
                </div>
                <div>
                    <EditRuleActionList ruleActions={this.props.rule.actions || []} onUpdate={this.handleRuleActionUpdate} onAdd={this.handleRuleActionAdd} />
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
    rule: _.find(state.rules.items, { id: ownProps.routeParams.id }) || {
                id: '',
                name: '',
                description: '',
                ruleDefinitions: [],
                actions: []
            }
}))(EditRule);

export default EditRule