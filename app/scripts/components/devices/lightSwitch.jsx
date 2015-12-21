var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var classNames = require('classnames');
var actions = require('actions/actions');
var _ = require('lodash');

var LightSwitch = React.createClass({
    mixins: [Reflux.connectFilter(deviceStore, "switchState", function(devices) {

        // For cases light rule/scene edit, we don't want the live state of the device but the one passed in.
        // TODO: move to somewhere common, this is repeated in lightSwitch and dimmer
        if (this.props.doNotBroadcastStateChanges) {
            return this.props.item.state;
        }
        else {
            var device = _.find(devices, { id: this.props.item.id });

            return device && device.state;
        }
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

        if (this.props.onStateChange) {
            this.props.onStateChange(this.props.item, state);
        }
    },
    render: function () {

        var classes =  classNames({
            'device': true,
            'lightSwitch': true,
            // Dimmer is 0/100, need to add a dimmer component
            'on': this.state.switchState === 'ON',
            'off': this.state.switchState === 'OFF',
            'clearfix': true,
            'compact': !!this.props.isCompact
        });

        // I don't think I want tags to show here anymore, so removing for now
        var tags = [];// this.props.item.tags || [];

         var tagMarkup = tags.map(tag => {
            return (
                <span key={tag.id} className="device-tag label label-default">{tag.name}</span>
            );
        });

         var iconClasses = classNames({
            fa: true,
            'fa-lightbulb-o': true,
            'fa-2x': !!this.props.isCompact,
            'fa-4x': !this.props.isCompact
         });

        return (
          <div className={classes} onClick={this.clickHandler}>
            <div className="device-icon">
                <i className={iconClasses}></i>
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