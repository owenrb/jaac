import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'
import { Surface } from 'react-native-paper'
import VoiceDropDown from 'react-native-paper-dropdown'
import { connect, useDispatch } from 'react-redux'
import { getVoiceList } from '../store/action'
import Tts from 'react-native-tts'
import { updateSettings } from '../store/action'

const account = 'owenrb@gmail.com'
const group = 'settings'

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
    getVoices()
      .then(list => console.log('get voices completed'))
      .catch(voicesError => console.log({ voicesError }))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.containerStyle}>
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
