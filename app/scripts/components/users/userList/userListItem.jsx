var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');

var UserListItem = React.createClass({
    
    getInitialState: function() {
        return {};
    },

    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteUser(this.props.user);
        }
    },

    render: function () {

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
});

module.exports = UserListItem;