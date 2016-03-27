var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var classNames = require('classnames');

var Thermostat = React.createClass({

    getInitialState: function() {
        return {
            setTemp: -1
        };
    },
    
    getCurrentSetTemp: function() {
        var setTemp = this.props.thermostat.heatSetPoint.state;
        
        return setTemp ? (Math.floor(setTemp) || 65) : 65;// '?';
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

        if (setTemp === '?') {
            return;
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

        actions.setDeviceState({ internalName: this.props.thermostat.heatSetPoint.internalName }, temp);

        // This is probably not best practice, but I'm lazy.
        this.props.thermostat.heatSetPoint.state = temp;
        this.state.setTemp = -1;
        this.setState({ setTemp: this.state.setTemp });
    },

    render: function () {

        var thermostat = this.props.thermostat;

        var currentTemp = thermostat.temperature.state || '?';

        var battery = thermostat.battery.state || 100;
        battery = Math.floor(battery);

        var batteryClass = 'fa-battery-full';
        if (battery < 20) batteryClass = 'fa-battery-empty';
        else if (battery < 40) batteryClass = 'fa-battery-quarter';
        else if (battery < 60) batteryClass = 'fa-battery-half';
        else if (battery < 80) batteryClass = 'fa-battery-three-quarters';

        var batteryCssObj = {
            'fa': true
        };

        batteryCssObj[batteryClass] = true;

        var batteryCss = classNames(batteryCssObj);

        // TODO: on save, some stuff is set on the server so this component breaks until the page is refreshed.  Won't be saving
        // much, so not sure I care.

        var currentSetTemp = this.getCurrentSetTemp();       
        var userSetTemp = this.state.setTemp;

        var isDirty = true;
        if (userSetTemp === -1 || userSetTemp === currentSetTemp) {
            userSetTemp = currentSetTemp;
            isDirty = false;
        }

        // TODO: bower update fontawesome --save
        // once github is back up

        return (
            <div>
                <h3><Link to={`/thermostats/edit/${this.props.thermostat.id}`}>{thermostat.name}</Link></h3>
                <div className="thermostat">
                    <div className="clearfix">
                        <div className="pull-left">
                            <button className="btn btn-info btn-lg" onClick={ this.handleMinusClick }>
                                <i className="fa fa-minus fa-3x" />
                            </button>
                        </div>
                        <div className="pull-right">
                            <button className="btn btn-danger btn-lg" href="#" onClick={ this.handlePlusClick }>
                                <i className="fa fa-plus fa-3x" />
                            </button>
                        </div>
                        <div className="set-temp">{ userSetTemp }</div> 
                    </div>
                    <div className="update-temp">
                        <button className="btn btn-lg btn-default" disabled={ !isDirty } onClick={ this.sendUpdatedTemp }>Set Temperature</button>
                    </div>
                    <div className="current-temp">
                        <label>currently</label>
                        <span>{ currentTemp }</span>
                    </div>
                    <div className="battery">
                        <i className={batteryCss} />
                        <span>{ battery }%</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Thermostat;