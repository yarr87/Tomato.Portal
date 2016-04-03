var Link = require('globals').Router.Link;
import Thermostat from './thermostat';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchThermostats } from '../../actions/thermostat.actions'
import { setDeviceState } from '../../actions'

class ThermostatList extends Component {
    constructor(props) {
        super(props)

        this.onUpdateTemp = this.onUpdateTemp.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchThermostats())
    }

    onUpdateTemp(thermostat, temp) {
        const { dispatch } = this.props
        dispatch(setDeviceState(thermostat.heatSetPoint.internalName, temp));
    }

    render () {

        const { isFetching, thermostats } = this.props

        if (isFetching) {
          return (<div>Loading...</div>);
        }

        var markup = (thermostats || []).map((thermostat) => {
            return (<Thermostat thermostat={thermostat} onUpdateTemp={this.onUpdateTemp} />);
        });

        return (
            <div>
                <Link to="/thermostats/add">Add Thermostat</Link>
                {markup}
            </div>
        );
    }
}

function mapStateToProps(state) {//, ownProps) {
  const thermostats = state.thermostats;
  return {
    isFetching: thermostats.isFetching,
    thermostats: thermostats.items
  }
}

export default connect(mapStateToProps)(ThermostatList)