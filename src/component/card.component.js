import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'
import Thumbnail from './thumbnail.component'
import Tts from 'react-native-tts'

const containerStyle = { backgroundColor: 'white', padding: 20 }

const CardComponent = ({
  type,
  base64,
  sentence,
  visible,
  hideModal,
  onSaveSentence,
}) => {
  const [value, setValue] = useState()

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          hideModal()
          setValue(null)
        }}
        contentContainerStyle={containerStyle}>
        <TouchableOpacity onPress={() => Tts.speak(value || sentence)}>
          <Thumbnail type={type} base64={base64} />
        </TouchableOpacity>
        <TextInput
          value={value || sentence}
          onChangeText={setValue}
          right={
            <TextInput.Icon
              icon="check-circle-outline"
              onPress={() => {
                console.log('saving', { value })
                onSaveSentence(value)
                hideModal(true)
                setValue(null)
              }}
              disabled={!value || value === sentence}
            />
          }
        />
      </Modal>
    </Portal>
  )
}

export default CardComponent
