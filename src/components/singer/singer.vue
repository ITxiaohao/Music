<template>
    <div>
        歌手页面
    </div>
</template>

<script>
import { getSingers } from 'api/singer';
import { ERR_OK } from 'common/js/config';
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingers();
  },
  methods: {
    _getSingers() {
      getSingers().then(res => {
        if (res.status === ERR_OK) {
          this.singers = res.data.artists;
          console.log(this.singers);
        } else {
          console.error('获取失败');
        }
      });
    },
    _normalizeSinger(list) {

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
