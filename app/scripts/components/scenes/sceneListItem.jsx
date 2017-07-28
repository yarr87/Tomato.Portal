import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SceneListItem extends Component {

    constructor(props) {
      super(props);

      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.onDelete(this.props.scene);
    }

    render () {

        return (
            <tr key={this.props.scene.id}>
                <td>{this.props.scene.name}
                </td>
                <td>{this.props.scene.description}</td>
                <td><Link to={`/scenes/edit/${this.props.scene.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
}