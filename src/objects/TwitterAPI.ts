import {MarinDeckTwitterAPI} from '../types/marindeckTypes'

export const TwitterAPI: MarinDeckTwitterAPI = {
  getClient: function(screenName) {
    return window.TD.controller.clients.getClient(
      window.TD.storage.accountController.getAll()
      .filter(({managed}) => managed)
      .find(({state: {username}}) => username === screenName)
      ?.privateState.key || ''
    )
  },
  getPreferredClient: function() {
    return window.TD.controller.clients.getPreferredClient('twitter')
  },
  showUser: function({screenName = null, userId = null, from = null}) {
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from) || this.getPreferredClient()
      client ? client.showUser(userId, screenName, resolve, reject) : reject()
    })
  },
  followUser: function({screenName, from}) {
    // 必須: screenName, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.followUser(screenName, resolve, reject) : reject()
    })
  },
  unfollowUser: function({screenName, from}) {
    // 必須: screenName, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.unfollowUser(screenName, resolve, reject) : reject()
    })
  },
  show: function({statusId, from = null}) {
    // 必須: statusId
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from) || this.getPreferredClient()
      client ? client.show(statusId, resolve, reject) : reject()
    })
  },
  update: function({status, inReplyToStatusId = null, lat = null, long = null, placeId = null, from}) {
    // 必須: status, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.update(status, inReplyToStatusId, lat, long, placeId, resolve, reject) : reject()
    })
  },
  destroy: function({statusId, from}) {
    // 必須: statusId, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.destroy(statusId, resolve, reject) : reject()
    })
  },
  favorite: function({statusId, from}) {
    // 必須: statusId, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.favorite(statusId, resolve, reject) : reject()
    })
  },
  unfavorite: function({statusId, from}) {
    // 必須: statusId, from
    return new Promise((resolve, reject) => {
      const client = from && this.getClient(from)
      client ? client.unfavorite(statusId, resolve, reject) : reject()
    })
  }
} as const
