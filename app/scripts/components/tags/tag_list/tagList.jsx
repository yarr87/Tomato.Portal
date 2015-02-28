var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var tagStore = require('stores/tagStore');
var TagListItem = require('components/tags/tag_list/tagListItem');
var actions = require('actions/actions');

var TagList = React.createClass({
    mixins: [Reflux.connect(tagStore)],

    getInitialState: function() {
        return {tags: []};
    },

    componentWillMount: function() {
        actions.loadTags();
    },

    render: function () {

        var items = this.state.tags.map(function(item) {
            return (
                <TagListItem tag={item} />
            );
        });

        return (
            <div>
                <Link to="addTag">Add Tag</Link>
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
});

module.exports = TagList;