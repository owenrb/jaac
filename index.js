/**
 * @format
 */
import 'react-native-gesture-handler'

import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import meReducer from './src/store/slice/me.slice'
import expressionReducer from './src/store/slice/expression.slice'
import aroundReducer from './src/store/slice/around.slice'
import authReducer from './src/store/slice/auth.slice'
import settingsReducer from './src/store/slice/settings.slice'

const store = configureStore({
  reducer: {
    expression: expressionReducer,
    me: meReducer,
    around: aroundReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
})

const theme = {
  ...DefaultTheme,
}

const reduxApp = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  </Provider>
)
AppRegistry.registerComponent(appName, () => reduxApp)
