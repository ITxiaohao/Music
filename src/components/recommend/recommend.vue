<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="banner.length" class="slider-wrapper">
        <slider>
          <div v-for="item in banner" :key="item.id">
            <a :href="item.url">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider';
import { getBanner } from 'api/recommend';
import { ERR_OK } from 'common/js/config';

export default {
  data() {
    return {
      banner: []
    }
  },
  created() {
    this._getBanner();
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        if (res.status === ERR_OK) {
          let list = res.data.banners
          this.banner = list.splice(4)
          console.log(this.banner)
          // this.banner = res.data.banners
        } else {
          console.error('获取失败');
        }
      });
    }
  },
  components: {
    Slider
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
    }
  }
}
</style>
