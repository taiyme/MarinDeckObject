import {TweetDeckControllerClient, TweetDeckUser} from './tweetdeckTypes'

export interface MarinDeckObject {
  readonly Version: string
  readonly Native: MarinDeckNative
  // readonly jQuery: JQueryStatic
  // readonly TwitterAPI: MarinDeckTwitterAPI
}

export type MarinDeckVersion = string

export interface MarinDeckNative {
  _post: (param: {
    object: {[key: string]: any}
    string: string
  }) => void
  post: (param: {
    type: string
    body: {[key: string]: any}
  }) => void
  get: <T = any>(param: {
    type: string
    body: {[key: string]: any}
  }) => Promise<T>
  send: <T = any>(parma: {
    uuid: string
    value: T
  }) => void
}

type TwitterShowUser = (param:
  | {
    screenName: string
    userId?: string | null
    from?: string | null
  }
  | {
    screenName?: string | null
    userId: string
    from?: string | null
  }
) => Promise<TweetDeckUser>

type TwitterFollowUser = (param: {
  screenName: string
  from: string
}) => Promise<TweetDeckUser>
type TwitterUnfollowUser = (param: {
  screenName: string
  from: string
}) => Promise<TweetDeckUser>

type TwitterShow = (param: {
  statusId: string
  from?: string | null
}) => Promise<unknown>

type TwitterUpdate = (param: {
  status: string
  inReplyToStatusId?: string | null
  lat?: null
  long?: null
  placeId?: null
  from: string
}) => Promise<unknown>
type TwitterDestroy = (param: {
  statusId: string
  from: string
}) => Promise<unknown>

type TwitterFavorite = (param: {
  statusId: string
  from: string
}) => Promise<unknown>
type TwitterUnfavorite = (param: {
  statusId: string
  from: string
}) => Promise<unknown>

export interface MarinDeckTwitterAPI {
  getClient: (screenName: string) => TweetDeckControllerClient | undefined
  getPreferredClient: () => TweetDeckControllerClient
  showUser: TwitterShowUser
  followUser: TwitterFollowUser
  unfollowUser: TwitterUnfollowUser
  show: TwitterShow
  update: TwitterUpdate
  destroy: TwitterDestroy
  favorite: TwitterFavorite
  unfavorite: TwitterUnfavorite
}
