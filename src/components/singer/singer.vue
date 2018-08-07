<template>
  <div class="singer">
    <list-view @select="selectSinger"
               :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingers } from 'api/singer'
import { ERR_OK } from 'common/js/config'

import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
const pinyin = require('pinyin')

export default {
  data () {
    return {
      singers: []
    };
  },
  created () {
    this._getSingers();
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingers () {
      getSingers().then(res => {
        if (res.status === ERR_OK) {
          let s = res.data.artists;
          // 因为网易云api没有首字母这个字段，需要自己添加，这里使用了 pinyin 这个插件
          // 之所以添加首字母是因为要做歌手首字母排序
          s.map((item) => {
            let py = pinyin(item.name[0], {
              style: pinyin.STYLE_FIRST_LETTER
            })
            item.initials = py[0][0].toUpperCase();
            // 因为蔡字没有转成字母，所以在这里强转一下
            for (let i = 0; i < s.length; i++) {
              if (s[i].initials === '蔡') {
                s[i].initials = 'C'
              }
            }
          })
          this.singers = this._normalizeSinger(s);
          console.log(this.singers);
          // console.log(this._normalizeSinger(this.singers))
        } else {
          console.error('获取失败');
        }
      });
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        // 如果小于 10 条就 push 到数组中
        if (index < HOT_SINGER_LEN) {
          // 把热门歌手的信息 push 到数组中
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatars: item.img1v1Url // 歌手头像
          }));
        }
        // 拿到歌手首字母
        const key = item.initials;
        // 判断 map 是否有这个 key，如果没有就创建一个新的对象
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: item.id,
          name: item.name,
          avatars: item.img1v1Url
        });
      });
      console.log(map)
      // 由于列表是无序的，我们要处理为有序列表，处理 map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        // 正则判断，如果都是字母则 push 到 ret 数组中
        if (val.title.match(/[a-zA-z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // A-Z 的顺序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
