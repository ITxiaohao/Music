<template>
  <div class="recommend">
    <scroll ref=scroll class="recommend-content" :data="recommendList">
      <div>
        <div v-if="banner.length" class="slider-wrapper">
          <slider>
            <div v-for="item in banner" :key="item.id">
              <a :href="item.url">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in recommendList" :key="item.id" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picUrl">
              </div>
              <div class="text">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.copywriter}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!recommendList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from 'base/loading/loading';
import Scroll from 'base/scroll/scroll';
import Slider from 'base/slider/slider';
import { getBanner, getRecommendList } from 'api/recommend';
import { ERR_OK } from 'common/js/config';

export default {
  data() {
    return {
      banner: [],
      recommendList: []
    };
  },
  created() {
    this._getBanner();
    this._getRecommendList();
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        if (res.status === ERR_OK) {
          let list = res.data.banners;
          this.banner = list.splice(4);
          console.log(this.banner);
          // this.banner = res.data.banners
        } else {
          console.error('获取失败');
        }
      });
    },
    _getRecommendList() {
      getRecommendList().then(res => {
        if (res.status === ERR_OK) {
          this.recommendList = res.data.result;
          console.log(this.recommendList);
        } else {
          console.error('获取失败');
        }
      });
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
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
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center; // 父级水平方向居中
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center; // 垂直方向居中
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top:50%;
      transform: translateY(-50%)
    }
  }
}
</style>
