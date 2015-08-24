var Reflux = require('reflux');
var actions = require('actions/actions');
var tagRepo = require('repositories/tagRepository');
var _ = require('lodash');
var $ = require('jquery');

var tagStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.tags = [];
        //actions.loadTags();

        // this.listenTo(tagStore, onTagUpdate); // use to update tags when they change
    },

    onDeleteTag: function(tag) {

        var index = _.findIndex(this.tags, { id: tag.id });

        if (index >= 0) {
            this.tags.splice(index, 1);

            this.trigger({
                tags: this.tags,
                deletedTagId: tag.id
            });

            tagRepo.deleteTag(tag);
        } 
    },

    onLoadTags: function() {
        tagRepo.getTags().then(function(tags) {
            this.tags = tags;
            this.trigger({
                tags: this.tags
            });
        }.bind(this));
    },

    onSaveTag: function(tag) {

        var localTag = _.find(this.tags, { name: tag.name });

        if (localTag) {
            $.extend(localTag, tag);
        }
        else {
            localTag = tag;
            this.tags.push(localTag);
        }

        tagRepo.addTag(tag).then(function(updatedTag) {
            // Updates from server (mostly for id on insert)
            $.extend(localTag, updatedTag);

            this.trigger({
                tags: this.tags,
                // Tag just updated so we know which one to update in linked devices
                updatedTag: localTag
            });
        }.bind(this));

        this.trigger({
                tags: this.tags,
                // Tag just updated so we know which one to update in linked devices
                updatedTag: localTag
            });
    }

});

module.exports = tagStore;