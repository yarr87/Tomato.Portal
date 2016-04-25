import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
//import DevTools from './DevTools'
import { Router } from 'react-router'
import DeviceStateHub from '../hubs/deviceState.hub'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    // return (
    //   <Provider store={store}>
    //     <div>
    //       <Router history={history} routes={routes} />
    //       <DevTools />
    //     </div>
    //   </Provider>
    // )

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DeviceStateHub />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}