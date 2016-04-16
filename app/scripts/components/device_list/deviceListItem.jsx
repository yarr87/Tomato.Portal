import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class DeviceListItem extends Component {
    
    constructor(props) {
      super(props);

      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.onDelete(this.props.rule);
    }

    render () {

        return (
            <tr>
                <td>{this.props.device.name}
                </td>
                <td>{this.props.device.internalName}</td>
                <td>{this.props.device.type}</td>
                <td><Link to={`/devices/edit/${this.props.device.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
}