import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices, deleteDevice } from '../../actions/device.actions'
import DeviceListItem from './deviceListItem'

class DeviceList extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.fetchDevices();
    }

    handleDelete(device) {
        if (confirm('really delete?')) {
            this.props.deleteDevice(device);
        }
    }

    render () {

        if (this.props.isFetching) {
            return (<div>Loading...</div>);
        }

        var items = this.props.devices.map((item) => {
            return (
                <DeviceListItem device={item} onDelete={this.handleDelete} />
            );
        });

        return (
            <div>
                <Link to="/devices/add">Add Device</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const devices = state.devices;
    return {
        isFetching: devices.isFetching,
        devices: _.filter(devices.items, (item) => item.type === 'LightSwitch' || item.type === 'Dimmer')
    }
}

export default connect(mapStateToProps, {
    fetchDevices,
    deleteDevice
})(DeviceList)