import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import * as screens from './src/containers'
import configureStore from './src/config/store';
const store = configureStore();
// const store = require('./src/config/store')

const RootNavigator = StackNavigator({
	main: {
		screen: screens.Main,
	},
	user: {
		screen: screens.User,
	},
})

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootNavigator />
			</Provider>
		)
	}
}
