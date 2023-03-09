import {
  append as appendStorage,
  read as getStorage,
  set as setStorage,
  remove as popStorage,
  patch as patchStorage,
} from '../dao/storage.dao'
import { listVoices } from '../api/tts.api'

export const getEntries = async (account, group) => {
  const payload = await getStorage(account, group)

  return {
    type: group + '/slide',
    payload,
  }
}

export const addEntry = async (account, group, data) => {
  const payload = await appendStorage(account, group, data)

  return {
    type: group + '/slide',
    payload,
  }
}

export const patchEntry = async (account, group, id, data) => {
  const payload = await patchStorage(account, group, id, data)

  return {
    type: group + '/slide',
    payload,
  }
}

export const removeEntry = async (account, group, id) => {
  const payload = await popStorage(account, group, id)

  return {
    type: group + '/slide',
    payload,
  }
}

export const updateSettings = async (account, data) => {
  const payload = await setStorage(account, 'settings', data)

  return {
    type: 'settings/saved',
    payload,
  }
}

export const getSettings = async account => {
  const payload = await getStorage(account, 'settings')

  return {
    type: 'settings/saved',
    payload,
  }
}

export const getVoiceList = async () => {
  const payload = await listVoices()

  return {
    type: 'settings/voices',
    payload,
  }
}
