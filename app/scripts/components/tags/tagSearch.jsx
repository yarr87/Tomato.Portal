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
            selectedTags: []
        };
    },

    componentWillMount: function() {
        actions.loadTags();
    },

    addTagFilter: function(tag) {

    },

    addSelectedTag: function(tag, selectedTags) {

        var tagToAdd = tag;

        while(tagToAdd) {
            var index = _.indexOf(selectedTags, tagToAdd);

            if (index === -1) {
                selectedTags.push(tagToAdd);
            }

            // not sure if i want auto-select
            tagToAdd = undefined;
            // if (tagToAdd.parentId) {
            //     tagToAdd = _.find(this.state.tags, { id: tagToAdd.parentId });
            // }
            // else {
            //     tagToAdd = undefined;
            // }
        }
    },

    removeSelectedTag: function(tag, selectedTags) {
         var tagToRemove = tag;

        var index = _.indexOf(selectedTags, tagToRemove);

        if (index >= 0) {
            selectedTags.splice(index, 1);
        }

        var childTags = _.filter(this.state.tags, { parentId: tagToRemove.id });

        _.each(childTags, function(childTag) {
            // not sure if i want auto-select
            //this.removeSelectedTag(childTag, selectedTagIds);
        }.bind(this));
    },

    handleTagClick: function(tag) {

        var tagToUpdate = tag;

        var selectedTags = this.state.selectedTags;

        // Removing the tag if it's in the selected list, adding it otherwise
        var isRemove = _.indexOf(selectedTags, tag) >= 0;

        if (isRemove) {
            this.removeSelectedTag(tag, selectedTags);
        }
        else {
            this.addSelectedTag(tag, selectedTags);
        }

        this.setState({ selectedTags: selectedTags });

        this.props.onTagSelect(this.state.selectedTags);
    },

    render: function () {

        var tags = this.state.tags.map(function(tag) {
            var cn = "block-grid-item tag";
            if (_.indexOf(this.state.selectedTags, tag) >= 0) {
                cn += " active";
            }
            else {
                cn += "";
            }

            return (
                <div key={tag.id} className={cn} onClick={this.handleTagClick.bind(this, tag)}>
                    <a>{tag.name}</a>
                </div>
            );

            // return (
            //     <li key={tag.id} className={cn}>
            //         <a href="#" onClick={this.handleTagClick.bind(this, tag)}>{tag.name}</a>
            //     </li>
            // );
        }.bind(this));

        return (
            <div className="tag-search block-grid-lg-10 block-grid-sm-5 block-grid-md-7 block-grid-xs-3">
                {tags}
            </div>
            )

        // return (
        //     <ul className="nav nav-pills tag-search">
        //         {tags}
        //     </ul>
        // );
    }
});

module.exports = TagSearch;