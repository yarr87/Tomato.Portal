import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchUsers, deleteUser } from '../../../actions/user.actions'
import UserListItem from './userListItem'

class UserList extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    handleDelete(user) {
        if (confirm('really delete?')) {
            this.props.deleteUser(user);
        }
    }

    render () {

        var items = this.props.users.map((item) => {
            return (
                <UserListItem user={item} onDelete={this.handleDelete} />
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
}

function mapStateToProps(state) {
    const users = state.users;
    return {
        isFetching: users.isFetching,
        users: users.items
    }
}

export default connect(mapStateToProps, {
    fetchUsers,
    deleteUser
})(UserList)