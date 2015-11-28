var React = require('react');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single user rule definition
var EditUserRule = React.createClass({

    availableStates: [
        { id: "state_home", name: "is home", isHome: true, isTriggered: false },
        { id: "state_not_home", name: "is not home", isHome: false, isTriggered: false },
        { id: "state_comes_home", name: "comes home", isHome: true, isTriggered: true },
        { id: "state_leaves_home", name: "leaves home", isHome: false, isTriggered: true }
    ],
    
    handleUserChange: function(newUserId) {
        var userRule = this.props.userRule;

        userRule.userState.userId = newUserId;

        this.props.onUpdate(userRule);
    },

    handleStateChange: function(newStateId) {
        var userRule = this.props.userRule;

        var selectedState = _.find(this.availableStates, { id: newStateId });

        userRule.userState.isHome = selectedState.isHome;
        userRule.isTriggered = selectedState.isTriggered; 

        this.props.onUpdate(userRule);
    },

    render: function () {

        var selectedUserId = this.props.userRule.userState.userId;

        var selectedState = _.find(this.availableStates, (availableState) => {
            return this.props.userRule.userState.isHome === availableState.isHome && this.props.userRule.isTriggered === availableState.isTriggered;
        }) || this.availableStates[0];

        var userSelections = (this.props.users || []).map((user) => {
            return { value: user.id, label: user.name };
        });

        var stateSelections = this.availableStates.map((availableState) => {
            return { value: availableState.id, label: availableState.name };
        });

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Picker options={userSelections} selectedValue={selectedUserId} onChange={this.handleUserChange} />
                    <Picker options={stateSelections} selectedValue={selectedState.id} onChange={this.handleStateChange} />
                </div>
            </div>
            );
    }
});

module.exports = EditUserRule;