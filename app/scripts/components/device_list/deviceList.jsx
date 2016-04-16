import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchDevices, deleteRule } from '../../actions'
import DeviceListItem from './deviceListItem'

class DeviceList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchDevices();
    }

    handleDelete(rule) {
        if (confirm('really delete?')) {
            this.props.deleteRule(rule);
        }
    }

    render () {

        if (this.props.isFetching) {
            return (<div>Loading...</div>);
        }

        var items = this.props.devices.map(function(item) {
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
        devices: devices.items
    }
}

export default connect(mapStateToProps, {
    fetchDevices
})(DeviceList)