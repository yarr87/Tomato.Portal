import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { fetchDevices } from '../actions/device.actions'
import Device from '../components/devices/device'
import _ from 'lodash'
import classNames from 'classnames'
import { setMultipleDeviceStates } from '../actions/device.actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.onAllClick = this.onAllClick.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleDismissClick = this.handleDismissClick.bind(this)
  }

//   // Filter the given list of devices to those that contain any of the given selected tags
// var getSelectedDevices = function(devices, selectedTags) {

//     if (selectedTags.length == 0) {
//         return devices;
//     }

//     return _.filter(devices, (device) => {
//         return _.any(device.tags, (tag) => {
//             return _.any(selectedTags, { id: tag.id });
//         });
//     });
// }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDevices())
  }

  onAllClick(state) {
    //var selectedDevices = getSelectedDevices(this.getDevices(), this.state.selectedTags);
    //actions.setMultipleDeviceStates(this.props.devices, state);
    const { dispatch, devices } = this.props
    dispatch(setMultipleDeviceStates(devices, state))
  }

  render() {
    const { isFetching, devices } = this.props

    if (isFetching) {
      return (<div>Loading...</div>);
    }

    var markup = devices.map(function(item, index) {

      var classObj = {
          'block-grid-item': true
      };

      classObj['device-block-' + (index + 1)] = true;

      var deviceClasses = classNames(classObj);

      return (
          <div key={item.id} className={deviceClasses}>
              <Device item={item} />
          </div>
      );
    });

    /* TODO: tag search might not be worth it.  If brought back, at least make it smaller */

    return (
        <div>
            <div className="row">                    
                <div className="col-sm-4 col-md-3 on-off-buttons clearfix">
                    <button className="btn on-button" onClick={this.onAllClick.bind(this, 'ON')}>
                        <i className="fa fa-circle"></i>
                        <span>On</span>
                    </button>
                    <button className="btn off-button" onClick={this.onAllClick.bind(this, 'OFF')}>
                        <i className="fa fa-circle-o"></i>
                        <span>Off</span>
                    </button>
                </div>
            </div>
            <div className="devices-dashboard block-grid-md-3 block-grid-sm-2 block-grid-xs-2">
               {markup}
            </div>
        </div>
    );

  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  //resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,

  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {//, ownProps) {
  const devices = state.devices;
  return {
    isFetching: devices.isFetching,
    // Filter out non-lights
    devices: _.filter(devices.items, (device) => {
        return device.type === 'LightSwitch' || device.type === 'Dimmer';
    })
  }
}

export default connect(mapStateToProps)(App)