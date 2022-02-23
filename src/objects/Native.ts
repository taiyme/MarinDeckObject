import {MarinDeckNative} from '../types/marindeckTypes'
import {genUUID} from '../helpers/index'

export const Native: MarinDeckNative = {
  _post: function({object, string}: {object: {[key: string]: any}, string: string}) {
    try {
      if (!window.webkit) throw new Error()
      window.webkit.messageHandlers.general.postMessage(object)
    } catch {}
    console.log(`mdnative:${string}`)
  },
  post: function({type, body}) {
    const uuid = genUUID()
    this._post({
      object: {type, body, uuid, method: 'post'},
      string: JSON.stringify({type, body, uuid, method: 'post'})
    })
  },
  get: function<T = any>({type, body}: {type: string, body: {[key: string]: any}}): Promise<T> {
    return new Promise((resolve, reject) => {
      const uuid = genUUID()
      const eventType = 'mdnativesend'
      const eventListener: EventListener = (event) => {
        const {detail: {value, uuid: U}} = event as CustomEvent<{value: T, uuid: string}>
        if (U === uuid) {
          window.removeEventListener(eventType, eventListener)
          resolve(value)
        }
      }
      window.addEventListener(eventType, eventListener)
      this._post({
        object: {type, body, uuid, method: 'get'},
        string: JSON.stringify({type, body, uuid, method: 'get'})
      })
    })
  },
  send: function({uuid, value}) {
    window.dispatchEvent(new CustomEvent('mdnativesend', {
      detail: {uuid, value, method: 'send'}
    }))
  }
} as const
