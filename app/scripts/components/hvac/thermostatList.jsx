var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var thermostatStore = require('stores/thermostatStore');
var actions = require('actions/actions');
var _ = require('lodash');
var Thermostat = require('components/hvac/thermostat');

var ThermostatList = React.createClass({
    mixins: [Reflux.connect(thermostatStore)],

    getInitialState: function() {
        return {
            thermostats: []
        };
    },

    componentWillMount: function() {
        actions.loadThermostats();
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

        var markup = (this.state.thermostats || []).map((thermostat) => {
            return (<Thermostat thermostat={thermostat} />);
        });

        return (
            <div>
                <Link to="/thermostats/add">Add Thermostat</Link>
                {markup}
            </div>
        );

        // TODO: handle multiple thermostats
        // var currentSetTemp = this.getCurrentSetTemp();       
        // var userSetTemp = this.state.setTemp;

        // var thermostat = this.state.thermostat;

        // if (userSetTemp === -1) {
        //     userSetTemp = currentSetTemp;
        // }

        // var isDirty = userSetTemp !== currentSetTemp;

        // return (
        //     <div>
        //         <div>
        //         Current temp: { thermostat.temperature.state }
        //         </div>
        //         <div>
        //         Set temp: { thermostat.heatSetPoint.state }
        //         </div>
        //         <div>
        //         Battery: { thermostat.battery.state }
        //         </div>

        //         <div className="clearfix">
        //             <div className="pull-left">
        //                 <button className="btn btn-info btn-lg" onClick={ this.handleMinusClick }>-</button>
        //             </div>
        //             <div className="pull-right">
        //                 <button className="btn btn-info btn-lg" href="#" onClick={ this.handlePlusClick }>+</button>
        //             </div>
        //             <div className="current-temp">{ userSetTemp }</div>
        //         </div>
        //         <div className="update-temp">
        //             <button className="btn btn-primary" disabled={ !isDirty } onClick={ this.sendUpdatedTemp }>Set Temperature</button>
        //         </div>
        //     </div>
        // );
    }
});

module.exports = ThermostatList;