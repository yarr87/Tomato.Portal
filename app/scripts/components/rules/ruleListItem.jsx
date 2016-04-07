import React, { Component, PropTypes } from 'react'
var _ = require('lodash');
var Link = require('globals').Router.Link;
var classNames = require('classnames');
import { hashHistory } from 'react-router'

export default class RuleListItem extends Component {

    constructor(props) {
        super(props);

        this.editRule = this.editRule.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEnableDisable = this.handleEnableDisable.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onDelete(this.props.rule); 
    }

    handleEnableDisable(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onEnableDisable(this.props.rule);
    }

    editRule() {
        hashHistory.push(`/rules/edit/${this.props.rule.id}`);
    }

    render() {

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
}