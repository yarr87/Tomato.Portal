var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var ruleStore = require('stores/ruleStore');
var RuleListItem = require('components/rules/ruleListItem');
var actions = require('actions/actions');

var RuleList = React.createClass({
    mixins: [Reflux.connect(ruleStore)],

    getInitialState: function() {
        return { rules: [] };
    },

    componentWillMount: function() {
        actions.loadRules();
    },

    render: function () {

        var items = this.state.rules.map(function(item) {
            return (
                <RuleListItem rule={item} />
            );
        });

        return (
            <div>
                <Link to="/rules/add">Add Rule</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
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

module.exports = RuleList;