import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchScenes, deleteScene } from '../../actions/scene.actions'
import SceneListItem from './sceneListItem'

class SceneList extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.fetchScenes();
    }

    handleDelete(scene) {
        if (confirm('really delete?')) {
            this.props.deleteScene(scene);
        }
    }

    render () {

        var items = this.props.scenes.map((item) => {
            return (
                <SceneListItem key={item.id} scene={item} onDelete={this.handleDelete} />
            );
        });

        return (
            <div>
                <Link to="/scenes/add">Add Scene</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
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
    const scenes = state.scenes;
    return {
        isFetching: scenes.isFetching,
        scenes: scenes.items
    }
}

export default connect(mapStateToProps, {
    fetchScenes,
    deleteScene
})(SceneList)