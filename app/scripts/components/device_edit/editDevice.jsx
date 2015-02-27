var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var RadioGroup = require('vendor/react-radiogroup');
var deviceStore = require('stores/deviceStore');
var actions = require('actions/actions');
var _ = require('lodash');

var EditDevice = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.Navigation,
             Reflux.connectFilter(deviceStore, "device", function(devices) {

                var device = _.find(devices, { id: parseInt(this.getParams().id) });

                return device || this.getInitialState().device;
            })
    ],


    getInitialState: function() {
        return {
            device: {
                name: '',
                type: 'LightSwitch',
                id: 0,
                nodeId: ''
            }
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
        // var id = this.getParams().id;

        // if (id) {
        //     deviceStore.getDeviceById(id).then(function(device) {
        //         this.setState({ device: device });
        //     }.bind(this));
        // }
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.device.name = e.target.value;
        this.setState({device: this.state.device});
    },

    handleIdChange: function(e) {
        this.state.device.nodeId = e.target.value;
        this.setState({device: this.state.device});
    },

    handleTypeChange: function(e) {
        this.state.device.type = e.target.value;
        this.setState({device: this.state.device });
    },

    handleClick: function(e) {
        e.preventDefault();

        var device = {
            id: this.state.device.id,
            nodeId: this.refs.nodeId.getDOMNode().value.trim(),
            name: this.refs.name.getDOMNode().value.trim(),
            type: this.refs.type.getCheckedValue()
        };

        actions.saveDevice(device);
        this.transitionTo('devices');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.transitionTo('devices');
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.device.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Node Id
                    <input className="form-control" type="text" ref="nodeId"  value={this.state.device.nodeId} onChange={this.handleIdChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Type
                    <RadioGroup name="type" ref="type" value="0">
                        <div className="radio">
                            <label><input name="lightSwitch" type="radio" value="LightSwitch" checked={this.state.device.type === 'LightSwitch'} onChange={this.handleTypeChange} />Light Switch</label>
                        </div>
                        <div className="radio">
                            <label><input name="dimmer" type="radio" value="Dimmer" checked={this.state.device.type === 'Dimmer'} onChange={this.handleTypeChange} />Dimmer</label>
                        </div>
                    </RadioGroup>
                    </label>
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleClick}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditDevice;
