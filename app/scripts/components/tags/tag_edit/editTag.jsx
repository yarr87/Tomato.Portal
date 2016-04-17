import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchTags, updateTag } from '../../../actions/tag.actions'
import { hashHistory } from 'react-router'

class EditTag extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount() {
        this.props.fetchTags();
    }

    handleSave(values) {

        var tag = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            parentId: values.parentId
        };

        this.props.updateTag(tag);
        hashHistory.push('/tags');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/tags');
    }

    render () {

        const { fields: {name, parentId }, handleSubmit } = this.props;

        var tagOptions = this.props.tags.map(function(tag) {

            if (tag.id === this.props.routeParams.id) return;

            return (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
            );
        }.bind(this));

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
                    <label>Parent</label>
                    <select className="form-control" {...parentId}>
                        <option />
                        {tagOptions}
                    </select>
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

EditTag = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
      form: 'tag',                           // a unique name for this form
      fields: ['name', 'parentId'] // all the fields in your form
  },
  (state, ownProps) => ({
      initialValues: _.find(state.tags.items, { id: ownProps.routeParams.id }),
      tags: state.tags.items
  }),
  {
      fetchTags,
      updateTag
  })(EditTag);

export default EditTag