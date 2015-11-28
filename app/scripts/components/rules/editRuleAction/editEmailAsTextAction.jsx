var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single text action for a rule
var EditEmailAsTextAction = React.createClass({

    handleUserChange: function(val) {
        var ruleAction = this.props.ruleAction;

        ruleAction.userId = val;

        this.props.onUpdate(ruleAction);
    },

    handleMessageChange: function(e) {
        var ruleAction = this.props.ruleAction;

        ruleAction.message = e.target.value;

        this.props.onUpdate(ruleAction);
    },

    render: function () {

        var selectedUserId = this.props.ruleAction.userId;

        var userSelections = (this.props.users || []).map((user) => {
            return { value: user.id, label: user.name }
        });

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    Text <Picker options={userSelections} selectedValue={selectedUserId} onChange={this.handleUserChange} />
                    with &nbsp;&nbsp;
                    <textarea className="form-control" value={this.props.ruleAction.message} onChange={this.handleMessageChange}></textarea>
                </div>
            </div>
            );
    }
});

module.exports = EditEmailAsTextAction;