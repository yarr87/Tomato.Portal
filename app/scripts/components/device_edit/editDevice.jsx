import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices, updateDevice } from '../../actions/device.actions'
import { fetchTags } from '../../actions/tag.actions'
import { hashHistory } from 'react-router'
var selectize = require('selectize');
var $ = require('jquery');

class EditDevice extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    //getInitialState: function() {
    //    return {
    //        device: {
    //            name: '',
    //            internalName: '',
    //            type: 'LightSwitch',
    //            id: '',
    //            nodeId: '',
    //            tags: []
    //        },
    //        tags: []
    //    };
    //},

    componentWillMount() {
        this.props.fetchDevices();
        this.props.fetchTags();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tags.length) {
            setTimeout(function() {
                $('#select-tags').selectize({
                    maxItems: 1000, // no max, really
                    //options: this.state.tags,
                    //items: this.state.device.tags,
                    labelField: 'name',
                    valueField: 'id',
                    searchField: 'name'
                });
            }.bind(this), 0);
        }
    }

    //componentWillUnmount() {
    //    // TODO: this is broken after react 0.14
    //    //$("#select-tags")[0].selectize.destroy();
    //}
    //
    //onTagsLoaded: function(tagObj) {
    //    this.state.tags = tagObj.tags;
    //    this.setState({tags: this.state.tags});
    //    setTimeout(function() {
    //        $('#select-tags').selectize({
    //            maxItems: 1000, // no max, really
    //            //options: this.state.tags,
    //            //items: this.state.device.tags,
    //            labelField: 'name',
    //            valueField: 'id',
    //            searchField: 'name'
    //        });
    //    }.bind(this), 0);
    //},

    handleSave(values) {

        // Control gives an array of ids, convert to full objects using the full tag list we already have
        var tags = $("#select-tags")[0].selectize.getValue().map((tagId) => {
            return _.find(this.props.tags, { id: tagId });
        });

        var device = {
            id: this.props.device.id,
            nodeId: values.nodeId.trim(),
            name: values.name.trim(),
            internalName: values.internalName.trim(),
            type: values.type,
            tags: tags
        };

        this.props.updateDevice(device);
        hashHistory.push('/devices');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/devices');
    }

    render () {

        const { fields: { name, internalName, nodeId, type, tags }, handleSubmit } = this.props;

        var tagSelectMarkup = '';

        // Want to render the tag select only after tags and device are loaded, so we can use defaultValue for initializing it.
        // I want this select to be uncontrolled so I don't have to deal with change events, but defaultValue can only be called once.
        if (this.props.tags.length && (this.props.device.id || this.props.routeParams.id === undefined)) {

            // Options for the tag select
            var tagOptions = this.props.tags.map(function(tag) {
                return (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                );
            }.bind(this));

            // Default value is the device's tags
            var directTags = _.filter(this.props.device.tags, function(tag) { return tag.isDirect; });
            var selectedTagIds = directTags.map(function(tag) { return tag.id; });

            tagSelectMarkup = (
              <select className="form-control" id="select-tags" multiple={true} value={selectedTagIds}>
                  {tagOptions}
              </select>
            );
        }

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
                          <label>Internal Name
                              <input className="form-control" type="text" required {...internalName} />
                          </label>
                      </div>
                      <div className="form-group">
                          <label>Node Id
                              <input className="form-control" type="text" required {...nodeId} />
                          </label>
                      </div>
                      <div className="form-group">
                          <label>Type
                              <div className="radio">
                                  <label><input name="lightSwitch" type="radio" {...type} value="LightSwitch" checked={type.value === 'LightSwitch'} />Light Switch</label>
                              </div>
                              <div className="radio">
                                  <label><input name="dimmer" type="radio" {...type} value="Dimmer" checked={type.value === 'Dimmer'} />Dimmer</label>
                              </div>
                          </label>
                      </div>
                      <div className="form-group">
                          <label>Tags</label>
                          {tagSelectMarkup}
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

EditDevice = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
      form: 'device',                           // a unique name for this form
      fields: ['name', 'internalName', 'nodeId', 'type', 'tags'] // all the fields in your form
  },
  (state, ownProps) => {

      var device = _.find(state.devices.items, { id: ownProps.routeParams.id }) || {};

      // For some reason excluding tags from initialValues makes it work with the select
      var initialValues = {
          name: device.name,
          internalName: device.internalName,
          nodeId: device.nodeId,
          type: device.type
      };

        return {
          initialValues,
          device,
          tags: state.tags.items
        };
  },
  {
      fetchDevices,
      fetchTags,
      updateDevice
  })(EditDevice);

export default EditDevice