<!--
 * @Author: zhengguozhi
 * @Date: 2020-06-02 18:28:39
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-12-22 17:30:21
-->
<template>
  <div class="border-comp bsbb">
    <div class="border-comp-title flex-center bsbb mc" v-if="hasTitle">
      <slot name="title"></slot>
    </div>
    <div class="border-comp-container pos-r out bsbb">
      <div class="top">
        <div class="bottom">
          <div class="inner">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasTitle: false
    }
  },
  components: {

  },
  props: {
    headfont: {
      type: String,
      default: '啦啦'
    }
  },
  computed: {

  },
  mounted () {
    // console.log('this.$scopedSlots-->', !!this.$scopedSlots.title)
    this.hasTitle = !!this.$scopedSlots.title
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.border-comp {
  &-title {
    bg-size(381px, 98px);
    background-image: url('http://pws.myhug.cn/npic/w/9/20201204200222_9e7d1166212490af6430a299a1f5d40e');
    // font-size: 30px;
    font-size: 38px;
    font-weight: 990;
    color: #ffffff;
    // text-shadow: 2.3px 1.9px 0 rgba(199, 78, 26, 0.5);
    padding-bottom: 16px;
  }

  &-container {
    margin-top: -4px;

    &.out {
      height: 100%;
      // background: url('http://pws.myhug.cn/npic/w/9/20201204170816_69d1ae4ad2f314217b871349f5a11407') repeat-y;
      background-image: url('http://pws.myhug.cn/npic/w/9/20201204170816_69d1ae4ad2f314217b871349f5a11407');
      background-repeat: repeat-y;
      background-size: 714px 199px;
      background-position: center;
      background-clip: content-box;
      padding: 80px 0 80px;
      background-origin: content-box;
      box-sizing: border-box;

      .top {
        background-size: contain;
        height: 100%;
        background-image: url('http://pws.myhug.cn/npic/w/9/20201204170814_5089e8f9a27a52975f5450a7a5aa8d0e');
        background-repeat: no-repeat;
        background-size: 714px 428px;
        background-position: center top;
        position: relative;
        top: -80px;
      }

      .bottom {
        height: 100%;
        background-image: url('http://pws.myhug.cn/npic/w/9/20201204170818_ea42a6da060848fa41b94667b1557376');
        background-repeat: no-repeat;
        background-size: 714px 378px;
        background-position: center bottom;
        position: relative;
        bottom: -160px;
      }

      .inner {
        min-height: 85px;
        position: relative;
        top: -80px;
      }
    }
  }
}
</style>
