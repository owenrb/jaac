import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-uuid'

/**
 *
 * @param {*} account
 * @param {*} group
 * @returns array of object
 */
const read = async (account, group) => {
  const label = '@' + account + '-' + group

  const value =
    (await AsyncStorage.getItem(label)) || JSON.stringify({ entries: [] })

  const obj = JSON.parse(value)

  return obj
}

const append = async (account, group, data) => {
  const label = '@' + account + '-' + group

  const obj = await read(account, group)

  data.id = uuid() // add unique id
  obj.entries.push(data)

  const updated = JSON.stringify(obj)

  await AsyncStorage.setItem(label, updated)

  return obj
}

const remove = async (account, group, id) => {
  const label = '@' + account + '-' + group
  console.log('remove', label, id)

  const obj = await read(account, group)
  const arr = obj.entries.filter(item => !(item.id === id))
  const filtered = { ...obj, entries: arr }

  const updated = JSON.stringify(filtered)

  await AsyncStorage.setItem(label, updated)

  return filtered
}

const patch = async (account, group, id, data) => {
  const label = '@' + account + '-' + group
  console.log('patch', label, id)

  const obj = await read(account, group)
  const pos = obj.entries.findIndex(item => item.id === id)
  if (pos <= 0) {
    console.warn(`Item#${id} not found in ${label}`)
    return data // no change
  }

  const existing = obj.entries[pos]
  obj.entries[pos] = { ...existing, ...data }
  console.log(pos, existing.sentence, 'vs', obj.entries[pos].sentence)

  const updated = JSON.stringify(obj)

  await AsyncStorage.setItem(label, updated)

  return obj
}

const set = async (account, group, data) => {
  const label = '@' + account + '-' + group

  await AsyncStorage.setItem(label, JSON.stringify(data))

  return data
}

export { append, read, set, remove, patch }
