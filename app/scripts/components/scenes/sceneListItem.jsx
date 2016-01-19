var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');

var SceneListItem = React.createClass({
    
    getInitialState: function() {
        return {};
    },

    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteScene(this.props.scene);
        }
    },

    render: function () {

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
});

module.exports = SceneListItem;