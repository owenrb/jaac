import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'

import BiometricButton from '../component/biometric.component'

const AuthScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <BiometricButton />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AuthScreen
