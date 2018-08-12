<template>
  <transition name="slide">
    <music-list :songs="songs"
                :title="title"
                :bg-image="bgImage"></music-list>
    <!-- <div class="singer-detail">

    </div> -->
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
// import { ERR_OK } from 'common/js/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatars
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
    console.log(this.singer);
  },
  methods: {

    _getDetail () {
      // 判断有没有 id 处理边界情况，如果没有就跳转会 singer 页面
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        // 传入歌手的单曲
        this.songs = this._normalizeSongs(res.data.hotSongs)
        console.log(this.songs);
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        // 创建歌曲实例
        ret.push(createSong(item))
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';

// .singer-detail {
//   position: fixed;
//   z-index: 100;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: $color-background;
// }

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
</style>
