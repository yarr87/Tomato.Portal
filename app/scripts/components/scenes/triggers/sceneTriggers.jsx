import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import _ from 'lodash'
import classNames from 'classnames'
import { hashHistory } from 'react-router'
import { fetchScenes } from '../../../actions/scene.actions'
import { fetchSceneTriggers, updateLocalSceneTriggers, updateSceneTriggers } from '../../../actions/sceneTrigger.actions'
import SceneTriggerGroup from './sceneTriggerGroup'

class SceneTriggers extends Component {

    constructor(props) {
        super(props);

        this.addNew = this.addNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleTriggerChange = this.handleTriggerChange.bind(this);
        this.handleTriggerDelete = this.handleTriggerDelete.bind(this);

        this.newGroupId = 1;

        this.newTrigger = {
            id: '',
            name: '',
            groupId: '',
            subId: '',
            triggerInternalName: '',
            sceneId: ''
        };

        this.minimoteTemplate = {
            triggers: [
                {
                    name: 'Button 1',
                    subId: '_1'
                },
                {
                    name: 'Button 1 Long',
                    subId: '_1_long'
                },
                {
                    name: 'Button 2',
                    subId: '_2'
                },
                {
                    name: 'Button 2 Long',
                    subId: '_2_long'
                },
                {
                    name: 'Button 3',
                    subId: '_3'
                },
                {
                    name: 'Button 3 Long',
                    subId: '_3_long'
                },
                {
                    name: 'Button 4',
                    subId: '_4'
                },
                {
                    name: 'Button 4 Long',
                    subId: '_4_long'
                }
            ]
        };
    }

    componentWillMount() {
        this.props.fetchScenes();
        this.props.fetchSceneTriggers();
    }

    addNew() {

        var newGroup = [];
        var groupId = 'New Trigger Group ' + this.newGroupId++;

        this.minimoteTemplate.triggers.forEach((trigger) => {
            var t = _.clone(this.newTrigger, true);
            t.groupId = groupId;
            newGroup.push( _.extend(t, trigger));
        });

        this.props.updateLocalSceneTriggers(this.props.localTriggers.concat(newGroup));
    }

    handleTriggerChange(groupName, triggers, index) {

        this.props.groupedTriggers[index].name = groupName;
        this.props.groupedTriggers[index].triggers = triggers;

        this.props.updateLocalSceneTriggers(_.reduce(this.props.groupedTriggers, (array, group) => {
            return array.concat(group.triggers)
        }, []));
    }

    handleTriggerDelete(index) {

        this.props.groupedTriggers.splice(index, 1);

        this.props.updateLocalSceneTriggers(_.reduce(this.props.groupedTriggers, (array, group) => {
            return array.concat(group.triggers)
        }, []));
    }

    handleSave(e) {
        e.preventDefault();

        this.props.updateSceneTriggers(this.props.localTriggers);
        hashHistory.push('/scenes');
    }

    handleCancel(e) {
        e.preventDefault();
        hashHistory.push('/scenes');
    }

    render () {

        const { groupedTriggers } = this.props;

        var items = _.map(groupedTriggers, (group, index) => {
            return (
                <div key={index}>
                    <SceneTriggerGroup name={group.name} triggers={group.triggers} scenes={this.props.scenes} index={index} onUpdate={this.handleTriggerChange} />
                    <a className="btn btn-link" onClick={this.handleTriggerDelete.bind(this, index)}>
                        <i className="fa fa-times" /> Delete
                    </a>
                    <hr />
                </div>
            );
        });

        return (
            <div>
                {items}
                <div className="form-group btn-toolbar">
                    <button type="button" className="btn btn-info" onClick={this.addNew}>Add</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // Group by GroupId, or just Id for non-grouped triggers
    var grouped = _.groupBy(state.sceneTriggers.local, (trigger) => {
        return trigger.groupId || trigger.id;
    });

    var groupedTriggers = [];

    _.forOwn(grouped, (group, name) => {
        groupedTriggers.push({
            name: name,
            triggers: group
        });
    });

    return {
        groupedTriggers,
        localTriggers: state.sceneTriggers.local,
        scenes: state.scenes.items
    }
}

export default connect(mapStateToProps, {
    fetchScenes,
    fetchSceneTriggers,
    updateLocalSceneTriggers,
    updateSceneTriggers
})(SceneTriggers)