var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');

var RuleListItem = React.createClass({
    
    getInitialState: function() {
        return {};
    },

    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteRule(this.props.rule);
        }
    },

    render: function () {

        return (
            <tr key={this.props.rule.id}>
                <td>{this.props.rule.name}
                </td>
                <td>{this.props.rule.description}</td>
                <td><Link to={`/rules/edit/${this.props.rule.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
});

module.exports = RuleListItem;