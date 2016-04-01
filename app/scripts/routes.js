import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Layout from './components/Layout'
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

// export default (
//   <Route path="/" component={App}>
//     <Route path="/:login/:name"
//            component={RepoPage} />
//     <Route path="/:login"
//            component={UserPage} />
//   </Route>
// )

export default (
  <Route path="/" component={Layout}>
  	<IndexRoute component={App} />
  </Route>
)