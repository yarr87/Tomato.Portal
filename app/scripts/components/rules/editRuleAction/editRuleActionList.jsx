var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var actions = require('actions/actions');
var deviceStore = require('stores/deviceStore');
var EditRuleActionDeviceState = require('components/rules/editRuleAction/editRuleActionDeviceState');

// List of editable rule actions for edit rule page
var EditRuleActionList = React.createClass({
    
    mixins: [Reflux.listenTo(deviceStore, 'onDevicesLoaded')],

    getInitialState: function() {
        return {
            devices: [],
            addDeviceName: ''
        }
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    onDevicesLoaded: function(devices) {
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    addNew: function() {
        var deviceInternalName = this.state.addDeviceName || this.state.devices[0].internalName;

        // Defaulting to OFF since if it's just empty the rule won't work.
        // TODO: maybe this logic should be in api
        this.props.ruleAction.deviceStates.push({ internalName: deviceInternalName, state: 'OFF' });
        this.props.onUpdate(this.props.ruleAction);
    },

    handleAddDeviceChange: function(e) {
        this.state.addDeviceName = e.target.value;
        this.setState({ addDeviceName: this.state.addDeviceName });
    },

    handleRuleActionChange: function(deviceState, index) {
        this.props.ruleAction.deviceStates[index] = deviceState;
        this.props.onUpdate(this.props.ruleAction);
    },

    handleRuleActionDelete: function(index) {
        this.props.ruleAction.deviceStates.splice(index, 1);
        this.props.onUpdate(this.props.ruleAction);
    },

    render: function () {

        var markup = this.props.ruleAction.deviceStates.map((deviceState, index) => {

            return (
                <div className="rule-action">
                    <div className="rule-action-delete">
                        <a className="btn btn-link" onClick={this.handleRuleActionDelete.bind(this, index)}>
                            <i className="fa fa-times" />
                        </a>
                    </div>
                    <div className="rule-action-edit">
                        <EditRuleActionDeviceState devices={this.state.devices} deviceState={deviceState} ruleIndex={index} onUpdate={this.handleRuleActionChange} />
                    </div>
                </div>
            );
        });

         var deviceOptions = (this.state.devices || []).map((device) => {
            return (
                <option key={device.id} value={device.internalName}>{device.name}</option>
            );
        });

        var deviceMarkup = (
            <select className="form-control" onChange={this.handleAddDeviceChange}>
                {deviceOptions}
            </select>
        );

        return (
            <div>
                <h3>Rule Actions</h3>
                {markup}
                <div className="rule-action-add row">
                    <div className="col-xs-6">
                        {deviceMarkup}
                    </div>
                    <div className="col-xs-6">
                        <a onClick={this.addNew}>Add</a>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = EditRuleActionList;