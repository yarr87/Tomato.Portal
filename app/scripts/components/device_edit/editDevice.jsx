var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var RadioGroup = require('vendor/react-radiogroup');
var deviceStore = require('stores/deviceStore');

var EditDevice = React.createClass({
    mixins: [ReactRouter.State],

    getInitialState: function() {
        return {
            device: {
                name: '',
                type: 'lightSwitch',
                id: 0,
                deviceId: ''
            }
        };
    },

    componentWillMount: function() {

        var id = this.getParams().id;

        if (id) {
            deviceStore.getDeviceById(id, function(device) {
                this.setState({ device: device });
            }.bind(this));
        }
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.device.name = e.target.value;
        this.setState({device: this.state.device});
    },

    handleIdChange: function(e) {
        this.state.device.deviceId = e.target.value;
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
            deviceId: this.refs.deviceId.getDOMNode().value.trim(),
            name: this.refs.name.getDOMNode().value.trim(),
            type: this.refs.type.getCheckedValue()
        };

        deviceStore.addDevice(device);
    },
    render: function () {

        return (
            <div className="row">
            <div className="large-6 columns">
            <form>
                <div className="row">
                    <div className="large-12 columns">
                        <label>Name
                        <input type="text" ref="name" value={this.state.device.name} onChange={this.handleNameChange} required />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="large-12 columns">
                        <label>Device Id
                        <input type="text" ref="deviceId"  value={this.state.device.deviceId} onChange={this.handleIdChange} required />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="large-12 columns">
                        <label>Type
                        <RadioGroup name="type" ref="type" value="0">
                          <label><input name="lightSwitch" type="radio" value="LightSwitch" checked={this.state.device.type === 'LightSwitch'} onChange={this.handleTypeChange} />Light Switch</label>
                          <label><input name="dimmer" type="radio" value="Dimmer" checked={this.state.device.type === 'Dimmer'} onChange={this.handleTypeChange} />Dimmer</label>
                        </RadioGroup>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="large-12 columns">
                        <button onClick={this.handleClick}>Save</button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditDevice;
