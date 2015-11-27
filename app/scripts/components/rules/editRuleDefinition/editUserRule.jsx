var React = require('react');
var _ = require('lodash');

// Edit a single user rule definition
var EditUserRule = React.createClass({

    availableStates: [
        { id: "state_home", name: "is home", isHome: true, isTriggered: false },
        { id: "state_not_home", name: "is not home", isHome: false, isTriggered: false },
        { id: "state_comes_home", name: "comes home", isHome: true, isTriggered: true },
        { id: "state_leaves_home", name: "leaves home", isHome: false, isTriggered: true }
    ],
    
    handleUserChange: function(e) {
        var userRule = this.props.userRule;

        userRule.userState.userId = e.target.value;

        this.props.onUpdate(userRule);
    },

    handleStateChange: function(e) {
        var userRule = this.props.userRule;

        var selectedState = _.find(this.availableStates, { id: e.target.value });

        userRule.userState.isHome = selectedState.isHome;
        userRule.isTriggered = selectedState.isTriggered; 

        this.props.onUpdate(userRule);
    },

    render: function () {

        var selectedUserId = this.props.userRule.userState.userId;

        // Options for the user select
        var userOptions = (this.props.users || []).map((user) => {
            return (
                <option key={user.id} value={user.id}>{user.name}</option>
            );
        });

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.userRule.userState.isHome === availableState.isHome && this.props.userRule.isTriggered === availableState.isTriggered;
        }) || {};

        var stateOptions = this.availableStates.map((availableState) => {
            return (
                <option key={availableState.id} value={availableState.id}>{availableState.name}</option>
            );
        })

        var userMarkup = (
            <select className="form-control" value={selectedUserId} onChange={this.handleUserChange}>
                {userOptions}
            </select>
        ); 

        var stateMarkup = (
            <select className="form-control" value={selectedState.id} onChange={this.handleStateChange}>
                {stateOptions}
            </select>
        );

        return (
            <div className="row rule-definition">
                <div className="col-xs-6">
                    {userMarkup}
                </div>
                <div className="col-xs-6">
                    {stateMarkup}
                </div>
            </div>
            );
    }
});

module.exports = EditUserRule;