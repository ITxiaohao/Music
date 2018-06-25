<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="item" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom';

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    // 循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 自动轮播间隔，每隔多少秒轮播一次
    interval: {
      type: Number,
      default: 4000
    }
  },
  // 初始化 better-scroll
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      // 因为better-scroll会初始化两个dom，分别在头和尾部，来做到无缝轮播，所以要在初始化BScroll之前要初始化dots，不然dots的数据不对
      this._initDots();
      this._initSlider();

      if (this.autoPlay) {
        this._play();
      }
    }, 20); // 浏览器的刷新是17毫秒一次，用20毫秒是比较好的

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    // 初始化 better-scroll
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横线滚动
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop, // 循环滚动
          threshold: 0.3,
          speed: 400
        }
        // click: true可能与fastClick起冲突
      });
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _play () {
      clearTimeout(this.timer) // 轮播前 clearTimeout
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
        }
        img {
            display: block;
            width: 100%;
        }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>