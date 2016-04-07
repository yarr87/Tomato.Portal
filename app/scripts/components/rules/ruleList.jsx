var Link = require('globals').Router.Link;
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchRules, deleteRule, toggleRule } from '../../actions/rule.actions'
import RuleListItem from './ruleListItem'

class RuleList extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEnableDisable = this.handleEnableDisable.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchRules());
    }

    handleDelete(rule) {
        if (confirm('really delete?')) {
            this.props.dispatch(deleteRule(rule));
        }
    }

    handleEnableDisable(rule) {
        this.props.dispatch(toggleRule(rule));
    }

    render() {

        if (this.props.isFetching) {
            return (<div>Loading...</div>);
        }

        var items = this.props.rules.map((item) => {
            return (
                <RuleListItem rule={item} onDelete={this.handleDelete} onEnableDisable={this.handleEnableDisable} />
            );
        });

        return (
            <div>
                <Link to="/rules/add">Add Rule</Link>
                <table className="table table-striped table-hover responsive">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Active</th>
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
  const rules = state.rules;
  return {
    isFetching: rules.isFetching,
    rules: rules.items
  }
}

export default connect(mapStateToProps)(RuleList)