var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var globals = require('globals');
var ReactRouter = globals.Router;

var RuleListItem = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
        return {};
    },

    handleDelete: function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('really delete?')) {
            actions.deleteRule(this.props.rule);
        }
    },

    handleEnableDisable: function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.rule.isDisabled = !this.props.rule.isDisabled;
        actions.saveRule(this.props.rule);
    },

    editRule: function() {
        this.history.pushState(null, '/rules/edit/' + this.props.rule.id);
    },

    render: function () {

        return (
            <tr key={this.props.rule.id} onClick={this.editRule}>
                <td>{this.props.rule.name}
                </td>
                <td className="hidden-xs">{this.props.rule.description}</td>
                <td className="hidden-xs">{this.props.rule.isDisabled ? 'No' : 'Yes' }</td>
                <td className="rule-table-edit">
                    <span className="hidden-xs"><Link to={`/rules/edit/${this.props.rule.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;</span>
                    <a className="hidden-xs" href="#" onClick={this.handleDelete}>Delete</a>
                    
                    <a href="#" onClick={this.handleEnableDisable} className={this.props.rule.isDisabled ? 'enable-link disabled' : 'enable-link enabled'}>
                        <i className={this.props.rule.isDisabled ? 'fa fa-2x fa-times' : 'fa fa-2x fa-check'} />
                    </a>

                    <button className="visible-xs-inline btn btn-default" onClick={this.handleDelete}>
                        <i className="fa fa-trash" />
                    </button>
                </td>
            </tr>
        );
    }
});

module.exports = RuleListItem;