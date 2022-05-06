<!--
 * @Author: zhengguozhi
 * @Date: 2019-12-04 12:03:35
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-07-29 18:01:45
 -->
<template>
  <div id="barrage" class="barrage">
    <div :style="{height:linehei+'px'}" class="line" v-for="(item,index) in count" :key="index">
      <barrage-item :list="data" :height="linehei" :index="index"></barrage-item>
    </div>
  </div>
</template>
<script>
import barrageItem from '@components/gaobai/barrage-item'
// import {barrageItem} from '@components/annual2019'

export default {
  name: 'barrage',
  props: {
    linecount: {
      type: Number
    },
    data: {
      type: Array
    }
  },
  components: {
    barrageItem
  },
  watch: {
    data (val) {
      this.data = val
    }
  },
  data () {
    return {
      list: [],
      linehei: 0,
      currentIndex: 0, // 当前索引
      isInData: false // 是否正在取数据
    }
  },
  computed: {
    count () {
      let _c = []
      for (let i = 0; i < this.linecount; i++) {
        _c.push({
          item: 10
        })
      }
      return _c
    }
  },
  methods: {
    rnd (n, m) {
      var random = Math.floor(Math.random() * (m - n + 1) + n)
      return random
    }
  },
  mounted: function () {
    this.list = this.data
    let barrageHei = window.getComputedStyle(document.getElementById('barrage'), null)['height']
    this.linehei = parseInt(barrageHei) / this.linecount
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

$rem = 50rem;

.barrage {
  height: 100%;
}
</style>
