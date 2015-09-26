var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var addons = require('react/addons').addons;
var actions = require('actions/actions');
var _ = require('lodash');
var InputSlider = require('react-input-slider');

var Dimmer = React.createClass({
    mixins: [Reflux.connectFilter(deviceStore, "switchState", function(devices) {

        var device = _.find(devices, { id: this.props.item.id });

        return device && device.state;
    })],

    getInitialState: function() {

        this.delayedAction = _.debounce(this.updateState, 100);


        return {
            // TODO: this is an 'anti-pattern' according to the docs.  State should be passed in.
            // But why would't a component own its own state?  The examples have it just bubble up the state change to the
            // top, then push it down from there.  That seems stupid.  Maybe a flux-style action system would help.
            switchState: 75// this.props.item.state 
        }
    },
    clickHandler: function() {
        var state = this.state.switchState;

        if (state === 'ON' || state === 100) state = 0;
        else state = 100;

        this.setState({
                switchState: state
            });

        // Broadcast the change, which updates the global device list and sends a command to the server.
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
    updateState: function(value) {
        actions.setDeviceState(this.props.item, value);
    },
    onChange: function(value) {

        var switchState = 100 - parseInt(value.y, 10);

        this.setState({ switchState: switchState });

        if (this.props.doNotBroadcastStateChanges !== true) {
            // Delay broadcast so we don't flood the light with update requests
            this.delayedAction(switchState);
        }
    },
    render: function () {

        var classes =  addons.classSet({
            'device': true,
            'dimmer': true,
            // Dimmer is 0/100, need to add a dimmer component
            'on': this.state.switchState === 'ON' || this.state.switchState === 100,
            'off': this.state.switchState === 'OFF' || this.state.switchState === 0,
            'clearfix': true
        });

        var tags = this.props.item.tags || [];

         var tagMarkup = tags.map(tag => {
            return (
                <span className="device-tag label label-default">{tag.name}</span>
            );
        });

        return (
          <div className={classes}>
            <div className="device-icon vertical-slider">
                 <InputSlider
                    className="slider slider-y"
                    axis='y'
                    y={100 - this.state.switchState}
                    ymax={100}
                    onChange={this.onChange}
                  />
                  <div>{this.state.switchState}%</div>
            </div>
            <div className="device-content" onClick={this.clickHandler}>
                <div className="device-type">Light Switch</div>
                <div className="device-name"><h3>{this.props.item.name}</h3></div>
                <div className="device-tags">{tagMarkup}</div>
            </div>
          </div>
        );
    }
});

module.exports = Dimmer;