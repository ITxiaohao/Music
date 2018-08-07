import * as types from './mutation-types'

const mutaitions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutaitions
