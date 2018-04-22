import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, File, Header } from '../'

const App = () => (
	<Fragment>
		<Header />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/file/:id" component={File} />
		</Switch>
	</Fragment>
)

export default App
