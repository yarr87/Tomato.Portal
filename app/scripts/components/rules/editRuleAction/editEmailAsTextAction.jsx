var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

// Edit a single text action for a rule
var EditEmailAsTextAction = React.createClass({

    handleUserChange: function(e) {
        var ruleAction = this.props.ruleAction;

        ruleAction.userId = e.target.value;

        this.props.onUpdate(ruleAction);
    },

    handleMessageChange: function(e) {
        var ruleAction = this.props.ruleAction;

        ruleAction.message = e.target.value;

        this.props.onUpdate(ruleAction);
    },

    render: function () {

        var selectedUserId = this.props.ruleAction.userId;

        // Options for the user select
        var userOptions = (this.props.users || []).map((user) => {
            return (
                <option key={user.id} value={user.id}>{user.name}</option>
            );
        });

        var userMarkup = (
            <select className="form-control" value={selectedUserId} onChange={this.handleUserChange}>
                {userOptions}
            </select>
        ); 

        return (
            <div className="row rule-action">
                <div className="col-xs-6 form-inline">
                    Text&nbsp;&nbsp; {userMarkup}
                </div>
                <div className="col-xs-6">
                    <textarea className="form-control" value={this.props.ruleAction.message} onChange={this.handleMessageChange}></textarea>
                </div>
            </div>
            );
    }
});

module.exports = EditEmailAsTextAction;