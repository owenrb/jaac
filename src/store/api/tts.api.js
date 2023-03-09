import Tts from 'react-native-tts'

Tts.addEventListener('tts-start', event => console.log('start', event))
Tts.addEventListener('tts-progress', event => console.log('progress', event))
Tts.addEventListener('tts-finish', event => console.log('finish', event))
Tts.addEventListener('tts-cancel', event => console.log('cancel', event))

const listVoices = async () => {
  return await Tts.voices()
}

export { listVoices }
