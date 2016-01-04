var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var deviceStore = require('stores/deviceStore');
var actions = require('actions/actions');
var _ = require('lodash');

var HVAC = React.createClass({
    mixins: [Reflux.connect(deviceStore, 'devices')],

    getInitialState: function() {
        return {
            devices: [],
            setTemp: -1
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    getCurrentSetTemp: function() {
        var hvac = _.find(this.state.devices, { type: 'Temperature' });
        return hvac ? (Math.floor(hvac.state) || 65) : '?';
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

        if (setTemp <= 55 || setTemp >= 75) {
            return;
        }

        setTemp += diff;

        this.setState({ setTemp: setTemp });
    },

    sendUpdatedTemp: function(e) {
        e.preventDefault();

        var temp = this.state.setTemp;

        if (temp === -1 || temp === this.getCurrentSetTemp()) {
            return;
        }

        var hvac = _.find(this.state.devices, { type: 'Temperature' });
        actions.setDeviceState(hvac, temp);
    },

    render: function () {

        // TODO: handle multiple thermostats
        var currentSetTemp = this.getCurrentSetTemp();       
        var userSetTemp = this.state.setTemp;

        var isDirty = false;
        if (userSetTemp === -1) {
            userSetTemp = currentSetTemp;
            isDirty = true;
        }

        return (
            <div>
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
                    <button className="btn btn-primary" onClick={ this.sendUpdatedTemp }>Set Temperature</button>
                </div>
            </div>
        );
    }
});

module.exports = HVAC;