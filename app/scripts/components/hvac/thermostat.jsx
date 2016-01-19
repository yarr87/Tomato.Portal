var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var deviceStore = require('stores/deviceStore');
var actions = require('actions/actions');
var _ = require('lodash');

var Thermostat = React.createClass({
    mixins: [Reflux.connect(deviceStore, 'devices')],

    getInitialState: function() {
        return {
            thermostat: {
                heatSetPoint: {
                    state: "60"
                },
                coolSetPoint: {},
                temperature: {
                    state: "65"
                },
                humidity: {},
                mode: {},
                fanMode: {},
                operatingState: {},
                fanState: {},
                battery: {}
            },
            setTemp: -1
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    getCurrentSetTemp: function() {
        var setPoint = this.state.thermostat.heatSetPoint;
        return setPoint.state ? (Math.floor(setPoint.state) || 65) : -1;
    },

    handleMinusClick: function() {
        this.userUpdateTemp(-1);
    },

    handlePlusClick: function() {
        this.userUpdateTemp(1);
    },

    userUpdateTemp: function(diff) {
        var setTemp = this.state.setTemp;

        if (setTemp === -1) {
            setTemp = this.getCurrentSetTemp();
        }

        setTemp += diff;

        if (setTemp < 55 || setTemp > 75) {
            return;
        }

        this.setState({ setTemp: setTemp });
    },

    sendUpdatedTemp: function(e) {
        e.preventDefault();

        var temp = this.state.setTemp;

        if (temp === -1 || temp === this.getCurrentSetTemp()) {
            return;
        }

        this.state.thermostat.heatSetPoint.state = temp;
        this.setState({ thermostat: this.state.thermostat });

        actions.setDeviceState(this.state.thermostat.heatSetPoint, temp);
    },

    render: function () {

        // TODO: handle multiple thermostats
        var currentSetTemp = this.getCurrentSetTemp();       
        var userSetTemp = this.state.setTemp;

        var thermostat = this.state.thermostat;

        if (userSetTemp === -1) {
            userSetTemp = currentSetTemp;
        }

        var isDirty = userSetTemp !== currentSetTemp;

        return (
            <div>
                <div>
                Current temp: { thermostat.temperature.state }
                </div>
                <div>
                Set temp: { thermostat.heatSetPoint.state }
                </div>
                <div>
                Battery: { thermostat.battery.state }
                </div>

                <div className="clearfix">
                    <div className="pull-left">
                        <button className="btn btn-info btn-lg" onClick={ this.handleMinusClick }>-</button>
                    </div>
                    <div className="pull-right">
                        <button className="btn btn-info btn-lg" href="#" onClick={ this.handlePlusClick }>+</button>
                    </div>
                    <div className="current-temp">{ userSetTemp }</div>
                </div>
                <div className="update-temp">
                    <button className="btn btn-primary" disabled={ !isDirty } onClick={ this.sendUpdatedTemp }>Set Temperature</button>
                </div>
            </div>
        );
    }
});

module.exports = Thermostat;