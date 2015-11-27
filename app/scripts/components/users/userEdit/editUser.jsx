var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var userStore = require('stores/userStore');
var actions = require('actions/actions');
var _ = require('lodash');

var EditUser = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(userStore, "user", function(usersObj) {

                var user = _.find(usersObj.users, { id: this.props.params.id });

                return user || this.getInitialState().user;
            })
    ],


    getInitialState: function() {
        return {
            user: {
                id: '',
                name: '',
                deviceMac: '',
                email: '',
                textAddress: ''
            }
        };
    },

    componentWillMount: function() {
        actions.loadUsers();
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.user.name = e.target.value;
        this.setState({user: this.state.user});
    },

    handleMacChange: function(e) {
        this.state.user.deviceMac = e.target.value;
        this.setState({user: this.state.user});
    },

    handleEmailChange: function(e) {
        this.state.user.email = e.target.value;
        this.setState({user: this.state.user});
    },

    handleTextAddressChange: function(e) {
        this.state.user.textAddress = e.target.value;
        this.setState({user: this.state.user});
    },

    handleSave: function(e) {
        e.preventDefault();

        var user = {
            id: this.state.user.id,
            name: this.refs.name.value.trim(),
            deviceMac: this.refs.deviceMac.value.trim(),
            email: this.refs.email.value.trim(),
            textAddress: this.refs.textAddress.value.trim()
        };

        actions.saveUser(user);
        this.history.pushState(null, '/users');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/users');
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-8">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.user.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Device Mac
                    <input className="form-control" type="text" ref="deviceMac"  value={this.state.user.deviceMac} onChange={this.handleMacChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Email
                    <input className="form-control" type="text" ref="email"  value={this.state.user.email} onChange={this.handleEmailChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Text Address
                    <input className="form-control" type="text" ref="textAddress"  value={this.state.user.textAddress} onChange={this.handleTextAddressChange} required />
                    </label>
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditUser;
