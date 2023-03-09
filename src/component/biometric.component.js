import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { Text } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { useDispatch } from 'react-redux'

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

export default BiometricButton = () => {
  const dispatch = useDispatch()
  const [biometry, setBiometry] = useState({})

  const detectBiometric = async () => {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable()

    setBiometry(
      available && biometryType
        ? { type: biometryType }
        : { type: 'Not available' },
    )
  }

  const simplePrompt = async () => {
    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then(resultObject => {
        const { success } = resultObject

        // if (success) {
        //   const password = moment().format('YYYY')
        //   dispatch(loginUser({ password }))
        // }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }

  useEffect(() => {
    detectBiometric()
  }, [])

  if (biometry.type) {
    return (
      <>
        <Button
          icon="fingerprint"
          disabled={biometry.type === 'Not available'}
          labelStyle={{ fontSize: 50 }}
          onPress={simplePrompt}></Button>
        <Text>{biometry.type}</Text>
      </>
    )
  }

  return <></>
}
