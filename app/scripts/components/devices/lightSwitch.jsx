var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var addons = require('react/addons').addons;
var actions = require('actions/actions');
var _ = require('lodash');

var LightSwitch = React.createClass({
    mixins: [Reflux.connectFilter(deviceStore, "switchState", function(devices) {

        var device = _.find(devices, { id: this.props.item.id });

        return device && device.state;
    })],

    getInitialState: function() {
        return {
            // TODO: this is an 'anti-pattern' according to the docs.  State should be passed in.
            // But why would't a component own its own state?  The examples have it just bubble up the state change to the
            // top, then push it down from there.  That seems stupid.  Maybe a flux-style action system would help.
            switchState: this.props.item.state 
        }
    },
    clickHandler: function() {
        var state = this.state.switchState;

        if (state === 'ON') state = 'OFF';
        else state = 'ON';

        // Broadcast the change, which updates the global device list and sends a command to the sever.
        // Able to turn off via a property for cases like scene edits.
        if (this.props.doNotBroadcastStateChanges !== true) {
            actions.setDeviceState(this.props.item, state);
        }
        else {
            this.setState({
                switchState: state
            });
        }
    },
    render: function () {

        var classes =  addons.classSet({
            'device': true,
            'lightSwitch': true,
            'on': this.state.switchState === 'ON',
            'off': this.state.switchState === 'OFF',
            'clearfix': true
        });

        var tags = this.props.item.tags || [];

         var tagMarkup = tags.map(function(tag) {
            return (
                <span className="device-tag label label-default">{tag.name}</span>
            );
        });

        return (
          <div className={classes} onClick={this.clickHandler}>
            <div className="device-icon">
                <i className="fa fa-lightbulb-o fa-4x"></i>
            </div>
            <div className="device-content">
                <div className="device-type">Light Switch</div>
                <div className="device-name"><h3>{this.props.item.name}</h3></div>
                <div className="device-tags">{tagMarkup}</div>
            </div>
          </div>
        );
    }
});

module.exports = LightSwitch;