import React from 'react'
import { Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Thumbnail = ({ base64, type }) => {
  if (!base64) {
    return (
      <MaterialCommunityIcons
        name="file-image-outline"
        size={200}
        color="grey"
      />
    )
  }

  const uri = 'data:' + type + ';base64,' + base64

  //console.log({ uri })

  return (
    <Image
      style={{ width: '100%', height: undefined, aspectRatio: 1 }}
      source={{ uri }}
    />
  )
}

export default Thumbnail
