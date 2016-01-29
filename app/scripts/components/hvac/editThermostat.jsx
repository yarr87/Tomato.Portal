var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var thermostatStore = require('stores/thermostatStore');
var actions = require('actions/actions');
var _ = require('lodash');

var EditThermostat = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(thermostatStore, "thermostat", function(thermostatObj) {

                var thermostat = _.find(thermostatObj.thermostats, { id: this.props.params.id });

                return _.clone(thermostat, true) || this.getInitialState().thermostat;
            })
    ],


    getInitialState: function() {
        return {
            thermostat: {
                id: '',
                name: '',
                internalNamePrefix: ''                
            }
        };
    },

    componentWillMount: function() {
        actions.loadThermostats();
    },

    handleNameChange: function(e) {
        this.state.thermostat.name = e.target.value;
        this.setState({thermostat: this.state.thermostat});
    },

    handleInternalNameChange: function(e) {
        this.state.thermostat.internalNamePrefix = e.target.value;
        this.setState({thermostat: this.state.thermostat});
    },

    handleSave: function(e) {
        e.preventDefault();

        var thermostat = {
            id: this.state.thermostat.id,
            name: this.refs.name.value.trim(),
            internalNamePrefix: this.refs.internalNamePrefix.value.trim()
        };

        actions.saveThermostat(thermostat);
        this.history.pushState(null, '/thermostats');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/thermostats');
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.thermostat.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Internal Name Prefix
                    <input className="form-control" type="text" ref="internalNamePrefix" value={this.state.thermostat.internalNamePrefix} onChange={this.handleInternalNameChange} />
                    </label>
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditThermostat;
