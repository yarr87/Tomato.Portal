import React, { Component, PropTypes } from 'react'
var Reflux = require('reflux');
import { connect } from 'react-redux'
//var deviceStore = require('stores/deviceStore');
var classNames = require('classnames');
//var actions = require('actions/actions');
var _ = require('lodash');
//import { setDeviceState } from '../../actions'


export default class LightSwitch extends Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleDismissClick = this.handleDismissClick.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

    // mixins: [Reflux.connectFilter(deviceStore, "switchState", function(devices) {

    //     // For cases light rule/scene edit, we don't want the live state of the device but the one passed in.
    //     // TODO: move to somewhere common, this is repeated in lightSwitch and dimmer
    //     if (this.props.doNotBroadcastStateChanges) {
    //         return this.props.item.state;
    //     }
    //     else {
    //         var device = _.find(devices, { id: this.props.item.id });

    //         return device && device.state;
    //     }
    // })],

    // getInitialState() {
    //     return {
    //         // TODO: this is an 'anti-pattern' according to the docs.  State should be passed in.
    //         // But why would't a component own its own state?  The examples have it just bubble up the state change to the
    //         // top, then push it down from there.  That seems stupid.  Maybe a flux-style action system would help.
    //         switchState: this.props.item.state 
    //     }
    // }
    
    clickHandler() {
        var state = this.props.item.state

        const { dispatch } = this.props

        // TODO: when dispatching an action, this component doesn't get notified of the result, probably because it's not subscribing
        // to any of the state.  Might need to just pass it an id and have it know which device from the state to get using connect?  Maybe that
        // happens in Device and just gets passed here via props.

        if (state === 'ON') state = 'OFF';
        else state = 'ON';

        // Broadcast the change, which updates the global device list and sends a command to the sever.
        // Able to turn off via a property for cases like scene edits.
        if (this.props.doNotBroadcastStateChanges !== true) {
            //actions.setDeviceState(this.props.item, state);
            //dispatch(setDeviceState(this.props.item.internalName, state));

            this.props.onStateChange(this.props.item, state);
        }
    }

    render() {

        var classes =  classNames({
            'device': true,
            'lightSwitch': true,
            // Dimmer is 0/100, need to add a dimmer component
            'on': this.props.item.state === 'ON',
            'off': this.props.item.state === 'OFF',
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
}

//export default connect(mapStateToProps)(LightSwitch)