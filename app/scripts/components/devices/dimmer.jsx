var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var classNames = require('classnames');
var actions = require('actions/actions');
var _ = require('lodash');
//var InputSlider = require('react-input-slider');
var Hammer = require('react-hammerjs');

var Dimmer = React.createClass({
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

        this.delayedAction = _.debounce(this.updateState, 100);

        var state = this.props.item.state;

        if (state === 'ON') state = 100;
        else if (state === 'OFF') state = 0;

        // Sometimes state is "uninitialized" if z-wave isn't ready yet
        state = parseInt(state, 10) || 0;


        return {
            // TODO: this is an 'anti-pattern' according to the docs.  State should be passed in.
            // But why would't a component own its own state?  The examples have it just bubble up the state change to the
            // top, then push it down from there.  That seems stupid.  Maybe a flux-style action system would help.
            switchState: state 
        }
    },
    clickHandler: function() {
        var state = this.state.switchState;

        // TODO: normalize state so it always comes back as an int or a string
        if (state === 'ON' || state === 100 || state === '100') state = 0;
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
    onPan: function(e) {

        // If you start panning then hold it, this even keeps firing but velocityX is zero.  Don't update in this case
        // because it's annoying.
        if (e.velocityX === 0) {
            return;
        }
        
        var state = this.state.switchState;
        var delta = parseInt(e.deltaX / 10, 10);

        if (state === 'ON') state = 100;
        else if (state === 'OFF') state = 0;

        state += delta;


        if (state < 0) state = 0;
        else if (state > 100) state = 100;

        this.setState({
            switchState: state
        });

        if (this.props.doNotBroadcastStateChanges !== true) {
            // Delay broadcast so we don't flood the light with update requests
            this.delayedAction(state);
        }

        if (this.props.onStateChange) {
            this.props.onStateChange(this.props.item, state);
        }

        e.cancel = true;
    },
    render: function () {

        var state = this.state.switchState || 0;

        if (state === 'ON') state = 100;
        else if (state === 'OFF') state = 0;

        var classes =  classNames({
            'device': true,
            'dimmer': true,
            // Dimmer is 0/100, need to add a dimmer component
            'on': state === 100,
            'off': state === 0,
            'clearfix': true,
            'compact': !!this.props.isCompact
        });

        var tags = this.props.item.tags || [];

         var tagMarkup = tags.map(tag => {
            return (
                <span key={tag.id} className="device-tag label label-default">{tag.name}</span>
            );
        });

         var style = {
            backgroundColor: "rgba(237, 213, 35, " + state / 100 + ")"
         };

         /*
         <InputSlider
                    className="slider slider-y"
                    axis='y'
                    y={100 - state}
                    ymax={100}
                    onChange={this.onChange}
                  />
                  */

            return (
                <Hammer onPan={this.onPan} onTap={this.clickHandler}>
                    <div className={classes}>
                        <div className="device-icon" style={style}>
                            <div>{state}%</div>
                        </div>
                        <div className="device-content">
                            <div className="device-type">Light Switch</div>
                            <div className="device-name"><h3>{this.props.item.name}</h3></div>
                            <div className="device-tags">{tagMarkup}</div>
                        </div>
                    </div>
                </Hammer>
              );
    }
});

module.exports = Dimmer;