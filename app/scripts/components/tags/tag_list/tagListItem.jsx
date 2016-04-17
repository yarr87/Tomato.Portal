import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class TagListItem extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onDelete(this.props.tag);
    }

    render () {

        return (
            <tr>
                <td>{this.props.tag.name}
                </td>
                <td><Link to={`/tags/edit/${this.props.tag.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
}