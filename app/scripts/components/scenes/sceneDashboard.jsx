import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchScenes, triggerScene } from '../../actions/scene.actions'

class SceneDashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchScenes();
    }

    handleSceneClick(scene) {
        this.props.triggerScene(scene);
    }

    render() {

        const { isFetching, scenes } = this.props;

        if (isFetching) {
            return (<div>Loading...</div>);
        }

        var markup = scenes.map((item, index) => {

            var classObj = {
                'block-grid-item': true,
                'scene': true
            };

            classObj['device-block-' + (index + 1)] = true;

            var deviceClasses = classNames(classObj);

            return (
                <div key={item.id} className={deviceClasses} onClick={this.handleSceneClick.bind(this, item)}>
                    <div>{ item.name }</div>
                </div>
            );
        });

        return (
            <div>
                <div className="scene-edit">
                    <Link to="/scenes/list">Edit Scenes</Link>&nbsp;&nbsp;&nbsp;
                    <Link to="/scenes/triggers">Triggers</Link>
                </div>
                <div className="devices-dashboard block-grid-md-3 block-grid-sm-2 block-grid-xs-2">
                   {markup}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const scenes = state.scenes;
    return {
        isFetching: scenes.isFetching,
        scenes: scenes.items
    }
}

export default connect(mapStateToProps, { fetchScenes, triggerScene })(SceneDashboard)