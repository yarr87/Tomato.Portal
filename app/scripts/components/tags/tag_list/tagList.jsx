import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchTags, deleteTag } from '../../../actions/tag.actions'
import TagListItem from './tagListItem'

class TagList extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.fetchTags();
    }

    handleDelete(tag) {
        if (confirm('really delete?')) {
            this.props.deleteTag(tag);
        }
    }

    render () {

        var items = this.props.tags.map((item) => {
            return (
                <TagListItem tag={item} onDelete={this.handleDelete} />
            );
        });

        return (
            <div>
                <Link to="/tags/add">Add Tag</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
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
    const tags = state.tags;
    return {
        isFetching: tags.isFetching,
        tags: tags.items
    }
}

export default connect(mapStateToProps, {
    fetchTags,
    deleteTag
})(TagList)