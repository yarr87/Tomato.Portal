var React = require('react');
var Reflux = require('reflux');
var tagStore = require('stores/tagStore');
var actions = require('actions/actions');
var _ = require('lodash');

var TagSearch = React.createClass({
    mixins: [Reflux.connect(tagStore)],

    getInitialState: function() {
        return {
            tags: [],
            selectedTagIds: []
        };
    },

    componentWillMount: function() {
        actions.loadTags();
    },

    handleTagClick: function(tag) {

        var selectedTagIds = this.state.selectedTagIds;

        var index = _.indexOf(selectedTagIds, tag.id);

        if (index >= 0) {
            selectedTagIds.splice(index, 1);
        }
        else {
            selectedTagIds.push(tag.id);
        }

        this.setState({ selectedTagIds: selectedTagIds });

        this.props.onTagSelect(this.state.selectedTagIds);
    },

    render: function () {

        var tags = this.state.tags.map(function(tag) {
            var cn = "tag";
            if (_.indexOf(this.state.selectedTagIds, tag.id) >= 0) {
                cn += " active";
            }
            else {
                cn += "";
            }

            return (
                <li className={cn}>
                    <a href="#" onClick={this.handleTagClick.bind(this, tag)}>{tag.name}</a>
                </li>
            );
        }.bind(this));

        return (
            <ul className="nav nav-pills tag-search">
                {tags}
            </ul>
        );
    }
});

module.exports = TagSearch;