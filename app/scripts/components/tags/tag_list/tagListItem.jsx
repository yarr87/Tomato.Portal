var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');

var TagListItem = React.createClass({
    
    getInitialState: function() {
        return {search: ''};
    },

    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteTag(this.props.tag);
        }
    },

    render: function () {

        return (
            <tr>
                <td>{this.props.tag.name}
                </td>
                <td><Link to={`/tags/edit/${this.props.tag.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
});

module.exports = TagListItem;