import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class UserListItem extends Component {

    constructor(props) {
      super(props);

      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.onDelete(this.props.user);
    }

    render () {

        return (
            <tr key={this.props.user.id}>
                <td>{this.props.user.name}
                </td>
                <td>{this.props.user.isHome ? 'Yes' : 'No'}</td>
                <td><Link to={`/users/edit/${this.props.user.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
}