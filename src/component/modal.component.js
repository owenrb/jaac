import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'

import { launchImageLibrary } from 'react-native-image-picker'

import Tts from 'react-native-tts'

import { useDispatch } from 'react-redux'
import { addEntry } from '../store/action'

import Thumbnail from './thumbnail.component'

const pickImage = handleChange => {
  const options = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.5,
    includeBase64: true,
  }

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('Image picker cancelled.')
    } else if (response.error) {
      console.error(response.error)
    } else {
      const { assets } = response
      const asset = assets[0]
      const { fileName, base64, width, height, type } = asset

      if (!base64) {
        handleChange('filename')('')
        handleChange('base64')('')
        return
      }

      //console.log({ asset })
      handleChange('filename')(fileName)
      handleChange('base64')(base64)
      handleChange('width')(width + '')
      handleChange('height')(height + '')
      handleChange('type')(type)
    }
  })
}

const speak = sentence => {
  Tts.speak(sentence)
}

/**
 *
 * @param {*} param0
 * @returns
 */
const ModalComponent = ({ visible, hideModal, account, group }) => {
  const dispatch = useDispatch()

  const persist = async values => {
    //console.log('saving slide', { values })
    dispatch(await addEntry(account, group, values))
    hideModal()
  }

  const containerStyle = { backgroundColor: 'white', padding: 20 }
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Formik
          initialValues={{
            sentence: '',
            filename: '',
            width: '',
            height: '',
            base64: '',
            type: '',
          }}
          validationSchema={Yup.object({
            sentence: Yup.string().required('Text to voice is required.'),
            filename: Yup.string().required('Image is required.'),
            width: Yup.string(),
            height: Yup.string(),
            base64: Yup.string().required(),
            type: Yup.string(),
          })}
          onSubmit={values => persist(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Thumbnail type={values.type} base64={values.base64} />
              <TextInput
                disabled={true}
                label={values.filename ? 'Filename' : 'Image is required'}
                value={values.filename}
                right={
                  <TextInput.Icon
                    icon="camera-outline"
                    onPress={() => pickImage(handleChange)}
                  />
                }
              />
              <TextInput
                label="Text to voice"
                onChangeText={handleChange('sentence')}
                onBlur={handleBlur('sentence')}
                value={values.sentence}
                error={errors.sentence}
                right={
                  <TextInput.Icon
                    icon="volume-high"
                    onPress={() => speak(values.sentence)}
                    disabled={!values.sentence}
                  />
                }
              />
              <Text visible={errors.sentence && touched.sentence}>
                {errors.sentence}
              </Text>
              <Button mode="contained" onPress={handleSubmit}>
                Save
              </Button>
            </>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}

export default ModalComponent
