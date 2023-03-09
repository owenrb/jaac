import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TemplateScreen from './home.template.screen'
import { connect, useDispatch } from 'react-redux'
import AuthScreen from './auth.screen'
import SettingsScreen from './settings.screen'

const Tab = createMaterialTopTabNavigator()

const HomeScreen = ({ route, auth }) => {
  const { params } = route
  const { editMode } = params || { editMode: false }
  const { authenticated } = auth

  console.log({ auth })

  return (
    <Tab.Navigator>
      {authenticated || !editMode ? null : (
        <Tab.Screen
          name="Login"
          component={AuthScreen}
          initialParams={{ ...params, tab: 'auth' }}
        />
      )}

      {authenticated && editMode ? (
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          initialParams={{ ...params, tab: 'auth' }}
        />
      ) : null}

      {!authenticated && editMode ? null : (
        <Tab.Screen
          name="Expression"
          component={TemplateScreen}
          initialParams={{ ...params, tab: 'expression' }}
        />
      )}

      {!authenticated && editMode ? null : (
        <Tab.Screen
          name="Me"
          component={TemplateScreen}
          initialParams={{ ...params, tab: 'me' }}
        />
      )}

      {!authenticated && editMode ? null : (
        <Tab.Screen
          name="Around"
          component={TemplateScreen}
          initialParams={{ ...params, tab: 'around' }}
        />
      )}
    </Tab.Navigator>
  )
}

const mapStateToProps = state => {
  //console.log({ state })
  return {
    auth: state.auth,
  }
}
export default connect(mapStateToProps)(HomeScreen)
