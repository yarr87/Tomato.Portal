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

        actions.setDeviceState(this.props.item, state);

        //deviceStore.sendCommand(this.props.item, state);

        //this.setState({ switchState: state });
    },
    render: function () {

        var classes =  addons.classSet({
            'device': true,
            'lightSwitch': true,
            'on': this.state.switchState === 'ON',
            'off': this.state.switchState === 'OFF'
        });

         var tagMarkup = this.props.item.tags.map(function(tag) {
            return (
                <div className="tag">{tag.name}</div>
            );
        });

        return (
          <div className={classes} onClick={this.clickHandler}>
            <i className="fa fa-lightbulb-o fa-4x"></i>
            Light Switch - {this.props.item.name}
            {tagMarkup}
          </div>
        );
    }
});

module.exports = LightSwitch;