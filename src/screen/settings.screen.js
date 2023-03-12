import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'
import { Surface } from 'react-native-paper'
import VoiceDropDown from 'react-native-paper-dropdown'
import { connect, useDispatch } from 'react-redux'
import { getVoiceList } from '../store/action'
import Tts from 'react-native-tts'
import { updateSettings } from '../store/action'

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication'

const account = 'owenrb@gmail.com'
const group = 'settings'

const onAppleButtonPress = async () => {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  })

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  )

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
}

const SettingsScreen = ({ settings }) => {
  const dispatch = useDispatch()

  const [voice, setVoice] = useState(settings.defaultVoice)
  const [showDropDown, setShowDropDown] = useState(false)

  const voices = settings.voices
    .filter(voice => voice.language.startsWith('en'))
    .map(voice => ({
      label: voice.name + ' (' + voice.language + ')',
      value: voice.id,
    }))

  const saveDefaultVoice = async defaultVoice => {
    const { voices, ...updates } = settings
    const data = { ...updates, defaultVoice }
    console.log('settings', { data })
    dispatch(await updateSettings(account, data))

    return 'Settings saved'
  }

  const assignVoice = value => {
    setVoice(value)

    const selected = settings.voices.filter(voice => voice.id === value)

    if (selected && selected.length > 0) {
      const name = selected[0].name

      Tts.setDefaultVoice(value)
      Tts.speak('Hello, my name is ' + name)

      saveDefaultVoice(value)
        .then(status => console.log({ status }))
        .catch(saveError => console.log({ saveError }))
    }
  }

  const getVoices = async () => {
    const list = await getVoiceList()
    dispatch(list)
    return list
  }

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      )
    })
  }, []) // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  useEffect(() => {
    getVoices()
      .then(list => console.log('get voices completed'))
      .catch(voicesError => console.log({ voicesError }))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.containerStyle}>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={() => onAppleButtonPress().then(x => {})}
        />
        <VoiceDropDown
          label={'Voices'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          mode={'outlined'}
          value={voice}
          setValue={assignVoice}
          list={voices}
        />
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  containerStyle: {
    flex: 1,
  },
})

const mapStateToProps = state => {
  //console.log({ state })
  return {
    settings: state.settings,
  }
}
export default connect(mapStateToProps)(SettingsScreen)
