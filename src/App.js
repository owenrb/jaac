/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screen/home.screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { connect, useDispatch } from 'react-redux'

import { getEntries, getSettings } from './store/action'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = props => {
  const { expression, me, around } = props
  const { entries: ee } = expression || { entries: [] }
  const { entries: em } = me || { entries: [] }
  const { entries: ea } = around || { entries: [] }
  const dispatch = useDispatch()
  const size = ee.length + em.length + ea.length

  const getAllEntries = async () => {
    const account = 'owenrb@gmail.com'

    dispatch(await getEntries(account, 'expression'))
    dispatch(await getEntries(account, 'me'))
    dispatch(await getEntries(account, 'around'))
    dispatch(await getSettings(account))

    return 'done'
  }

  useEffect(() => {
    getAllEntries()
      .then(res => console.log(res))
      .catch(error => console.log({ error }))
  }, [size])

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            icon="home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
            listeners={{
              tabPress: e => {
                const type = 'auth/status'
                const payload = { authenticated: false }

                dispatch({ type, payload })
              },
            }}
          />
          <Tab.Screen
            name="Edit"
            icon="edit"
            component={HomeScreen}
            initialParams={{ editMode: true }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="table-edit"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

const mapStateToProps = state => {
  //console.log({ state })
  return {
    expession: state.expression,
    me: state.me,
    around: state.around,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(App)
