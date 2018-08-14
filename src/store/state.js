import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false, // 歌曲当前的播放 还是暂停
  fullScreen: false, // 歌曲栏是否全屏
  playlist: [], // 当前播放列表 （可能是随机播放、顺序播放） 那么歌曲的顺序是动态的
  sequenceList: [], // 按顺序排列的播放列表，即无论当前是随机播放还是顺序播放，歌曲的顺序都是一致的
  mode: playMode.sequence, // 默认是顺序播放，引入 config
  currentIndex: -1 // 当前歌曲的下标
}

export default state
