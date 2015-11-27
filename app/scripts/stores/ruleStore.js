var Reflux = require('reflux');
var actions = require('actions/actions');
var ruleRepo = require('repositories/ruleRepository');
var _ = require('lodash');
var $ = require('jquery');

var ruleStore = Reflux.createStore({

    listenables: actions,

    init: function() {
        this.rules = [];
    },

    onDeleteRule: function(rule) {

        var index = _.findIndex(this.rules, { id: rule.id });

        if (index >= 0) {
            this.rules.splice(index, 1);

            this.trigger({
                rules: this.rules,
                deletedRuleId: rule.id
            });

            ruleRepo.deleteRule(rule);
        } 
    },

    onLoadRules: function() {
        ruleRepo.getRules().then(function(rules) {
            this.rules = rules;
            this.trigger({
                rules: this.rules
            });
        }.bind(this));
    },

    onSaveRule: function(rule) {

        var localRule = _.find(this.rules, { id: rule.id });

        if (localRule) {
            $.extend(localRule, rule);
        }
        else {
            localRule = rule;
            this.rules.push(localRule);
        }

        ruleRepo.saveRule(rule).then(function(updatedRule) {
            // Updates from server (mostly for id on insert)
            $.extend(localRule, updatedRule);

            this.trigger({
                rules: this.rules,
                // Rule just updated so we know which one to update in anything with rule embedded
                updatedRule: localRule
            });
        }.bind(this));

        this.trigger({
                rules: this.rules,
                // Tag just updated so we know which one to update in linked devices
                updatedRule: localRule
            });
    }

});

module.exports = ruleStore;