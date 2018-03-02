import React from 'react';
import { Provider } from 'react-redux'
import ReduxApp from './src/containers'
import configureStore from './src/config/store';


const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    )
}

export default App
