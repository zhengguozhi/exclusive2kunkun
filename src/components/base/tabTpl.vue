<!--
 * @Author: zhengguozhi
 * @Date: 2020-06-02 17:52:48
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-06-04 21:00:17
-->
<template>
  <div class="tab-box bsbb flex">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item flex-center bsbb pos-r"
      :class="{'tab-on': tabOn === item.id}"
      @click="tabHandle(index)"
    >
      <div class="col-s-line pos-a"></div>
      <div class="tab-item-title">{{item.title}}</div>
      <div class="tab-item-date">{{item.date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabList: [
        {
          id: 1,
          title: '海选',
          date: '6.7.12:00 - 6.8.24:00'
        },
        {
          id: 2,
          title: '初赛',
          date: '6.9.00:00 - 6.10.24:00'
        },
        {
          id: 3,
          title: '复赛',
          date: '6.12.00:00 - 24:00'
        },
        {
          id: 4,
          title: '决赛',
          date: '6.15.12:00 - 24:00'
        }
      ],
      idList: [1, 2, 3, 4],
      tabOn: 1
    }
  },
  components: {},
  props: {
    headfont: {
      type: String,
      default: '啦啦'
    }
  },
  computed: {},
  mounted () { },
  methods: {
    tabHandle (index) {
      if (this.tabOn === this.idList[index]) {
        return false
      }
      // this.tabOn = this.idList[index]
      this.$emit('tabEmit', index)
    },
    tabActive (index) {
      this.tabOn = this.idList[index]
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.tab-box {
  background-color: #ffc53a;
  height: 75px;
  justify-content: space-between;

  .tab-item {
    flex-direction: column;
    // padding: 0 10px;
    flex: 1;

    &.tab-on {
      background-color: #ff842d;

      .col-s-line {
        border-right-color: transparent !important;
      }
    }

    &:not(:last-child) {
      .col-s-line {
        border-right: 1px solid #ffeaa1;
        height: 28px;
        right: 0;
        top: 50%;
        margin-top: -(@height / 2px);
      }
    }

    &-title {
      font-size: 28px;
      color: #ffffff;
      margin-bottom: 2px;
    }

    &-date {
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
