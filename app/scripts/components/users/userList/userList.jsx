var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var userStore = require('stores/userStore');
 var UserListItem = require('components/users/userList/userListItem');
var actions = require('actions/actions');

var UserList = React.createClass({
    mixins: [Reflux.connect(userStore)],

    getInitialState: function() {
        return { users: [] };
    },

    componentWillMount: function() {
        actions.loadUsers();
    },


    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteUser(this.props.tag);
        }
    },

    render: function () {

        var items = this.state.users.map(function(item) {
            return (
                <UserListItem user={item} />
            );
        });

        return (
            <div>
                <Link to="/users/add">Add User</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Home?</th>
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
});

module.exports = UserList;