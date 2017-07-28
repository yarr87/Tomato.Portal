import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchThermostats } from '../../actions/thermostat.actions'
import { updateThermostat } from '../../actions/thermostat.actions'
import { hashHistory } from 'react-router'

class EditThermostat extends Component {
    // mixins: [ReactRouter.State, ReactRouter.History,
    //          Reflux.connectFilter(thermostatStore, "thermostat", function(thermostatObj) {

    //             var thermostat = _.find(thermostatObj.thermostats, { id: this.props.params.id });

    //             return _.clone(thermostat, true) || this.getInitialState().thermostat;
    //         })
    // ],

    constructor(props) {
        super(props)

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchThermostats())
    }

    handleSave(values) {

        var thermostat = {
            id: this.props.routeParams.id,
            name: values.name.trim(),
            internalNamePrefix: values.internalNamePrefix.trim()
        };

        this.props.dispatch(updateThermostat(thermostat));
        hashHistory.push('/thermostats');
    }

    handleCancel(e) {
        e.preventDefault();
        // TODO: what if i want to change to html5 mode and need browesrHistor?  Maybe I should wrap this.
        hashHistory.push('/thermostats');
    }

    render () {

        const {fields: {name, internalNamePrefix}, handleSubmit} = this.props;

        return (
            <div className="row">
            <div className="col-md-6">
            <form onSubmit={handleSubmit(this.handleSave)}>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" required {...name} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Internal Name Prefix
                    <input className="form-control" type="text" {...internalNamePrefix} />
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

EditThermostat = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'thermostat',                           // a unique name for this form
  fields: ['name', 'internalNamePrefix'] // all the fields in your form
},
// TODO: something is weird here, when i save then come back it shows the old value, not sure why
(state, ownProps) => ({
    initialValues: _.find(state.thermostats.items, { id: ownProps.routeParams.id })
}))(EditThermostat);

export default EditThermostat