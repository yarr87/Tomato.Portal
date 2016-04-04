var globals = require('globals');
var ReactRouter = globals.Router;
import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchSonoses, updateSonos } from '../../actions/sonos.actions'
import { hashHistory } from 'react-router'

class EditSonos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sonos: {
                id: '',
                name: ''
            }
        };

        this.handleSave = this.handleSave.bind(this);
    }
    
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchSonoses())
    }

    handleSave(values) {

        var sonos = {
            id: this.props.routeParams.id,
            name: values.name.trim()
        };

        this.props.dispatch(updateSonos(sonos));
        hashHistory.push('/sonos');
    }

    handleCancel(e) {
        e.preventDefault();
        // TODO: what if i want to change to html5 mode and need browesrHistor?  Maybe I should wrap this.
        hashHistory.push('/sonos');
    }

    render() {

         const {fields: { name }, handleSubmit} = this.props;

        return (
            <div className="row">
            <div className="col-md-6">
             <form onSubmit={handleSubmit(this.handleSave)}>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" required {...name} />
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

EditSonos = reduxForm({
  form: 'sonos',                          
  fields: ['name'] 
},
// TODO: something is weird here, when i save then come back it shows the old value, not sure why
(state, ownProps) => ({
    initialValues: _.find(state.sonoses.items, { id: ownProps.routeParams.id })
}))(EditSonos);

export default EditSonos