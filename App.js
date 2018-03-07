import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import * as screens from './src/containers'
import changefeedListeners from './src/db/changefeed-listeners'
import configureStore from './src/config/store';
const store = configureStore();

changefeedListeners(store)

const RootNavigator = StackNavigator({
	main: {
		screen: screens.Main,
	},
	user: {
		screen: screens.User,
	},
})

export default class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Provider store={store}>
				<RootNavigator {...this.props} />
			</Provider>
		)
	}
}
