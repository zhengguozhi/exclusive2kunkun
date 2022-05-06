<!--
 * @Author: xuxueliang
 * @Date: 2019-11-29 15:26:25
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-09-22 20:43:11
 -->
<template>
  <div class="list-out list-type-two">
    <div class="list-none flex-center" v-show="mainList.length < 1">还没有人上榜呦～</div>
    <div class="list-contaner mc pos-r">
      <div
        class="item"
        :class="['rank-'+(i+1), {'common-item':i>2}, {'top-three': i < 3}]"
        v-for="(item,i) in mainList"
        :key="i"
      >
        <div class="row-line mc" v-if="i === 3"></div>
        <div class="num-index">{{i>2?i+1:''}}</div>
        <div @click="toProfile(item.userBase.uId)" class="tou bsbb">
          <div class="crown" :class="'crown-'+(i+1)"></div>
          <img :src="item.userBase.portraitUrl" alt class="img" />
          <div class="foot-label" v-if="i < 3"></div>
        </div>
        <!-- <div class="info"> -->
        <p class="name fh">{{item.userBase.nickName}}</p>
        <!-- <span :class="getStagClass(item.userBase.sex)"></span>
        <span :class="getGradeClass(item.userZhibo.grade)">{{item.userZhibo.grade}}</span>-->
        <p class="jifen">{{prefixTag}}{{item.score}}{{tags}}</p>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { getStagClass, getGradeClass, toProfile } from '@lib/common/config/baobaoUtils'
import { toProfile } from '@lib/common/config/baobaoUtils'
export default {
  name: '',
  props: {
    mainList: {
      type: Array,
      default () {
        return []
      }
    },
    tag: {
      type: String,
      default: ''
    },
    prefixTag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tags: '积分'
    }
  },
  watch: {
    tag: {
      immediate: true,
      handler () {
        this.tags = this.tag
      }
    }
  },
  mounted () {
  },
  methods: {
    toProfile: function (uId) {
      toProfile(uId)
    },
    getStagClass (tag) {
      // return getStagClass(tag)
    },
    getGradeClass (grade) {
      // return getGradeClass(grade)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';
@import '~@lib/common/stylus/baobao.styl';

.list-type-two {
  .list-none {
    min-height: pageScaleByBase(200px, 2);
    height: 100%;
    color: rgba(255, 34, 120, 0.5);
    font-size: pageScaleByBase(28px, 2);
  }

  .userStagGirlas {
    widows: 100%;
  }

  .userGrade {
    box-sizing: border-box;
    height: pageScaleByBase(33px, 2);
    padding-top: pageScaleByBase(1px, 2);
    padding-bottom: pageScaleByBase(6px, 2);
    line-height: pageScaleByBase(33px, 2);
    padding-left: pageScaleByBase(41px, 2);
    padding-right: pageScaleByBase(10px, 2);
    font-weight: 400;
    font-size: pageScaleByBase(22px, 2);
    margin-left: pageScaleByBase(10px, 2);
  }

  .userStag {
    width: pageScaleByBase(32px, 2);
    height: pageScaleByBase(33px, 2);
    padding: 0 pageScaleByBase(1.5px, 2);
    margin-left: pageScaleByBase(10px, 2);
  }

  .userStagBoy {
    background-color: #6fbaf7;
  }

  .item {
    color: #ffffff;
    font-size: pageScaleByBase(28px, 2);

    .name {
      max-width: pageScaleByBase(240px, 2);
    }

    .jifen {
      white-space: nowrap;
    }
  }

  .common-item {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: pageScaleByBase(16px, 2);
    padding-bottom: pageScaleByBase(16px, 2);
    padding-left: pageScaleByBase(46px, 2);
    padding-right: pageScaleByBase(36px, 2);
    box-sizing: border-box;

    // &::after {
    // content: '';
    // display: block;
    // width: pageScaleByBase( 36px,2);
    // border-bottom: pageScaleByBase( 2px,2) solid #fff;
    // bottom: 0;
    // cl();
    // }
    .num-index {
      width: pageScaleByBase(80px, 2);
      color: rgba(174, 34, 247, 1);
      font-size: pageScaleByBase(36px, 2);
      font-style: italic;
    }

    .tou {
      position: relative;
      margin-right: pageScaleByBase(30px, 2);

      .img {
        width: pageScaleByBase(100px, 2);
        height: pageScaleByBase(100px, 2);
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        // box-shadow: 0 0 0 pageScaleByBase( 8px,2) #FFC300;
        position: relative;
      }
    }

    .name {
      flex: 1;
    }

    .jifen {
      flex: 1;
      text-align: right;
    }
  }

  .top-three {
    width: pageScaleByBase(160px, 2);
    text-align: center;

    .tou {
      position: relative;
      margin-bottom: pageScaleByBase(40px, 2);

      .img {
        border-radius: 50%;
        display: block;
        position: relative;
        margin: 0 auto;
      }
    }

    .name {
      margin-bottom: pageScaleByBase(6px, 2);
    }

    .jifen {
      white-space: pre-wrap;
    }

    &.rank-1 {
      padding: pageScaleByBase(0px, 2) 0 pageScaleByBase(80px, 2);
      margin: 0 auto;
      position: relative;

      // width: pageScaleByBase( 160px,2);
      .img {
        width: pageScaleByBase(160px, 2);
        height: pageScaleByBase(160px, 2);
        box-shadow: 0 0 0 pageScaleByBase(8px, 2) #FFC300;
      }

      .foot-label {
        cl();
        bottom: pageScaleByBase(-18px, 2);
        width: pageScaleByBase(183px, 2);
        height: pageScaleByBase(39px, 2);
        background: url('http://pws.myhug.cn/npic/w/9/20200810165517_96fbf8696826baf710c94fb1a69504be') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff58393eeb10adb2dc9d84e5c859446941e839c2c1637d) no-repeat center center/ cover ;
      }

      .crown {
        top: pageScaleByBase(-56px, 2);
        width: pageScaleByBase(87px, 2);
        height: pageScaleByBase(53px, 2);
        cl();
        background: url('http://pws.myhug.cn/npic/w/9/20200710173516_9db22e8c7fc9608f984791f88a7748f0') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff58393eeb10adb2dc9d84e5c859446941e839c2c1637d) no-repeat center center/ cover ;
      }
    }

    &.rank-2 {
      position: absolute;
      left: pageScaleByBase(35px, 2);
      top: pageScaleByBase(46px, 2);

      // width: pageScaleByBase( 120px,2);
      .img {
        width: pageScaleByBase(120px, 2);
        height: pageScaleByBase(120px, 2);
        box-shadow: 0 0 0 pageScaleByBase(8px, 2) #C2D2EB;
      }

      .crown {
        width: pageScaleByBase(72px, 2);
        height: pageScaleByBase(44px, 2);
        top: pageScaleByBase(-44px, 2);
        cl();
        background: url('http://pws.myhug.cn/npic/w/9/20200710173518_f03868b71bc45eae92d6bef38e76c23d') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
      }

      .foot-label {
        cl();
        width: pageScaleByBase(150px, 2);
        height: pageScaleByBase(32px, 2);
        bottom: pageScaleByBase(-18px, 2);
        background: url('http://pws.myhug.cn/npic/w/9/20200810165515_dccb159d5016c607d755a7a4ed044dc1') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
      }
    }

    &.rank-3 {
      position: absolute;
      right: pageScaleByBase(35px, 2);
      top: pageScaleByBase(46px, 2);

      // width: pageScaleByBase( 120px,2);
      .img {
        width: pageScaleByBase(120px, 2);
        height: pageScaleByBase(120px, 2);
        box-shadow: 0 0 0 pageScaleByBase(8px, 2) #EBCBB1;
      }

      .crown {
        width: pageScaleByBase(72px, 2);
        height: pageScaleByBase(44px, 2);
        top: pageScaleByBase(-44px, 2);
        cl();
        background: url('http://pws.myhug.cn/npic/w/9/20200710173517_9bbf7a70a72154a975353a49b8276a5c') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
      }

      .foot-label {
        width: pageScaleByBase(150px, 2);
        height: pageScaleByBase(32px, 2);
        bottom: pageScaleByBase(-18px, 2);
        cl();
        background: url('http://pws.myhug.cn/npic/w/9/20200810165516_02d4d449266cb80135b007412b09db48') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
      }
    }
  }

  .row-line {
    width: pageScaleByBase(547px, 2);
    border-top: pageScaleByBase(3px, 2) dashed rgba(174, 34, 247, 0.5);
    top: pageScaleByBase(-30px, 2);
    cl();
  }
}
</style>
