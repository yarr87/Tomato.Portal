import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchScenes, testScene, updateScene } from '../../actions/scene.actions'
import { hashHistory } from 'react-router'
import EditRuleActionList from '../rules/editRuleAction/editRuleActionList'

class EditScene extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.testScene = this.testScene.bind(this);
    }

    componentWillMount() {
        this.props.fetchScenes();
    }

    handleSave(values) {

        var scene = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            description: values.description,
            actions: values.actions
        };

        this.props.updateScene(scene);
        hashHistory.push('/scenes/list');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/scenes/list');
    }

    testScene(e) {
        e.preventDefault();

        var scene = {
            id: this.props.routeParams.id,
            name: this.props.fields.name.value,
            description: this.props.fields.description.value,
            actions: this.props.fields.actions.value
        };

        this.props.testScene(scene);
    }

    render () {

        const { fields: { name, description, actions }, handleSubmit } = this.props;

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
                    <textarea className="form-control" type="text" {...description} />
                    </label>
                </div>
                <div>
                    <EditRuleActionList ruleActions={actions.value} {...actions} />
                </div>
                <div className="form-group btn-toolbar">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                    <button type="button" className="btn btn-info" onClick={this.testScene}>Test</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

}

EditScene = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
      form: 'scene',                           // a unique name for this form
      fields: ['name', 'description', 'actions'] // all the fields in your form
  },
  (state, ownProps) => ({
      initialValues: _.find(state.scenes.items, { id: ownProps.routeParams.id })
  }),
  {
      fetchScenes,
      testScene,
      updateScene
  })(EditScene);

export default EditScene
