<!--
 * @Author: zhengguozhi
 * @Date: 2020-06-02 17:17:49
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-06-04 19:15:55
-->
<template>
  <div class="top-bg pos-r bsbb" :style="{backgroundImage: 'url(' + imgSource.topBg + ')'}">
    <div class="top-title mc ani" :style="{backgroundImage: 'url(' + imgSource.topTitle + ')'}"></div>
    <div class="top-left mc" :style="{backgroundImage: 'url(' + imgSource.topleft + ')'}"></div>
    <div class="top-right mc" :style="{backgroundImage: 'url(' + imgSource.topRight + ')'}"></div>
  </div>
</template>

<script>
import { assetsUrl } from '@config'
let imgSource = {
  topBg: assetsUrl + '/npic/w/9/20200602172620_d76088feffaa72c00e3417b4bc4bc0fd',
  topTitle: assetsUrl + '/npic/w/9/20200604190712_a8a0e5caedd4c9384a1b019c7985db31',
  topleft: assetsUrl + '/npic/w/9/20200602172625_271cea400cb94680c5dd5eb9c73ca095',
  topRight: assetsUrl + '/npic/w/9/20200602172654_dca88119ae0954bfdca8e93345e98d8b'
}
export default {
  data () {
    return {
      imgSource
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

  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.top-bg {
  bg-size(750px, 765px);
  padding-top: 82px;

  .top-title {
    bg-size(750px, 400px);
    position: relative;
    z-index: 1;
  }

  .top-left {
    bg-size(175px, 105px);
    position: absolute;
    left: 0;
    bottom: 230px;
  }

  .top-right {
    bg-size(137px, 150px);
    position: absolute;
    right: 16px;
    bottom: 250px;
  }

  .ani {
    animation: scaleAni 1.5s linear infinite alternate;
  }
}

@keyframes scaleAni {
  to {
    transform: translateY(14px);
  }
}
</style>
