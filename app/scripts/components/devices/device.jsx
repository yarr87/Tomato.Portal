import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LightSwitch from './lightSwitch'
// var Dimmer = require('components/devices/dimmer');
import { setDeviceState } from '../../actions'
import _ from 'lodash'

class Device extends Component {

    constructor(props) {
        super(props);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(device, state) {
        this.props.setDeviceState(device.internalName, state);
    }

    render() {

        var device;

        if (this.props.item.type === 'LightSwitch') {
            device = (
                <LightSwitch item={this.props.item} doNotBroadcastStateChanges={this.props.doNotBroadcastStateChanges} isCompact={this.props.isCompact} onStateChange={this.handleStateChange} />
            );
        }
        else if (this.props.item.type === 'Dimmer') {
            device = (<div>dimmer</div>);
            // device = (
            //     <Dimmer item={this.props.item} doNotBroadcastStateChanges={this.props.doNotBroadcastStateChanges} isCompact={this.props.isCompact} onStateChange={this.handleStateChange} />
            // );
        }
        else {
            device = (
                <div className="device">Generic - {this.props.item.name}</div>
            );
        }

        return (
          <div>
            {device}
          </div>
        );
    }
}

export default connect(undefined, {
  setDeviceState
})(Device)
