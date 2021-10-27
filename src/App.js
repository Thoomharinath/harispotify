import {Route, Switch} from 'react-router-dom'

import Login from './components/LoginForm'
import Discover from './components/Discover'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/Discover" component={Discover} />
  </Switch>
)

export default App

// <Route exact path="/Home" component={Home} />
