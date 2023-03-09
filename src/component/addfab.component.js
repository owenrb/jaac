import React, { useState } from 'react'
import { FAB } from 'react-native-paper'
import ModalComponent from './modal.component'

const AddFAB = ({ showFab, style, account, group }) => {
  const [visible, setVisible] = React.useState(false)

  return showFab ? (
    <>
      <FAB icon="plus" style={style} onPress={() => setVisible(true)} />
      <ModalComponent
        visible={visible}
        hideModal={() => setVisible(false)}
        account={account}
        group={group}
      />
    </>
  ) : null
}

export default AddFAB
