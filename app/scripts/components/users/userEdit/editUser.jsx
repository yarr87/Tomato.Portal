import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchUsers, updateUser } from '../../../actions/user.actions'
import { hashHistory } from 'react-router'

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    handleSave(values) {
        var user = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            deviceMac: values.deviceMac.trim(),
            email: values.email.trim(),
            textAddress: values.textAddress.trim()
        };

        this.props.updateUser(user);
        hashHistory.push('/users');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/users');
    }

    render () {

        const { fields: { name, deviceMac, email, textAddress }, handleSubmit } = this.props;

        return (
            <div className="row">
            <div className="col-md-8">
            <form onSubmit={ handleSubmit(this.handleSave) }>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" required {...name} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Device Mac
                    <input className="form-control" type="text" required {...deviceMac} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Email
                    <input className="form-control" type="text" required {...email} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Text Address
                    <input className="form-control" type="text" required {...textAddress} />
                    </label>
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

EditUser = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
      form: 'tag',                           // a unique name for this form
      fields: ['name', 'deviceMac', 'email', 'textAddress'] // all the fields in your form
  },
  (state, ownProps) => ({
      initialValues: _.find(state.users.items, { id: ownProps.routeParams.id })
  }),
  {
      fetchUsers,
      updateUser
  })(EditUser);

export default EditUser
