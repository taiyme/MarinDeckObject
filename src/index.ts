import {MarinDeckObject} from './types/marindeckTypes'
import {TweetDeckObject} from './types/tweetdeckTypes'

import {Version} from './objects/Version'
import {Native} from './objects/Native'
// import {jQuery} from './objects/jQuery'
// import {TwitterAPI} from './objects/TwitterAPI'

declare global {
  interface Window {
    MD: MarinDeckObject
    readonly TD: TweetDeckObject
    readonly webkit?: {
      readonly messageHandlers: {
        readonly [key: string]: {
          readonly postMessage: <T = any>(msg: T) => void
        }
      }
    }
  }
}

window.MD = {
  ...(window.MD as {}) || {},
  Version,
  Native,
  // jQuery,
  // TwitterAPI
} as const
