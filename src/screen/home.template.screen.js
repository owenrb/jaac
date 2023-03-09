import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import AddFAB from '../component/addfab.component'
import { useDispatch, useSelector } from 'react-redux'
import CardComponent from '../component/card.component'
import Tts from 'react-native-tts'
import { FAB } from 'react-native-paper'
import { patchEntry, removeEntry } from '../store/action'

const { width } = Dimensions.get('window')
const imageWidth = (width - 10) / 2

const TemplateScreen = ({ route }) => {
  const { params } = route
  const { editMode, tab } = params
  console.log({ tab })

  // TODO
  const account = 'owenrb@gmail.com'

  const dispatch = useDispatch()

  const reduxState = useSelector(state => state[tab])
  const { entries } = reduxState

  const [cardVisible, setCardVisible] = useState(false)
  const [type, setType] = useState()
  const [base64, setBase64] = useState()
  const [sentence, setSentence] = useState()
  const [entryId, setEntryId] = useState()

  const showConfirmDialog = (id, filename) => {
    const doDeleteItem = id => {
      removeEntry(account, tab, id)
        .then(payload => dispatch(payload))
        .catch(removeEntryErr => console.log({ removeEntryErr }))
    }

    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove: ' + filename,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            doDeleteItem(id)
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    )
  }

  const renderItem = ({ item }) => {
    const { type, base64, sentence, id, filename } = item

    const uri = 'data:' + type + ';base64,' + base64
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setType(type)
            setBase64(base64)
            setSentence(sentence)
            setCardVisible(true)
            setEntryId(id)
            Tts.speak(sentence)
          }}>
          <Image source={{ uri }} style={styles.image} />
        </TouchableOpacity>
        {editMode ? (
          <FAB
            icon="delete-forever-outline"
            style={styles.fabBin}
            size={'small'}
            onPress={() => showConfirmDialog(id, filename)}
          />
        ) : null}
      </View>
    )
  }

  const saveSentence = (id, par) => {
    patchEntry(account, tab, id, { sentence: par })
      .then(payload => dispatch(payload))
      .catch(patchError => console.error({ patchError }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatContainer}
      />
      <AddFAB
        showFab={editMode}
        style={styles.fab}
        group={tab}
        account={account}
      />
      <CardComponent
        visible={cardVisible}
        hideModal={() => setCardVisible(false)}
        type={type}
        base64={base64}
        sentence={sentence}
        onSaveSentence={par => saveSentence(entryId, par)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContainer: {
    alignItems: 'center',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    margin: 3,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fabBin: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})
export default TemplateScreen
