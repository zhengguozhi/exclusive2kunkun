<!--
 * @Author: zhengguozhi
 * @Date: 2020-07-16 17:29:58
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2021-06-04 22:06:16
-->
<template>
  <div class="list all-list">
    <div class="main-list">
      <div class="list-none flex-center" v-show="mainList.length < 1">
        还没有人上榜呦～
      </div>
      <div :key="index" v-for="(item, index) in mainList">
        <div class="item normal item-top-3" v-if="index <= 2">
          <div class="inner-item">
            <div class="nums">{{ index + 1 }}</div>
            <div class="imgs" @click="toProfile(item.userBase.uId)">
              <div class="wangguan" v-if="index === 0"></div>
              <img :src="item.userBase.portraitUrl" alt />
            </div>
            <!-- <div class="info"> -->
            <p class="title fh">{{ item.userBase.nickName }}</p>
            <!-- <span :class="getStagClass(item.userBase.sex)"></span> -->
            <!-- <span :class="getGradeClass(item.userZhibo.grade)">{{item.userZhibo.grade}}</span> -->
            <p class="jifen">{{ prefixTag }}{{ item.score }}{{ tags }}</p>
            <!-- </div> -->
          </div>
        </div>
        <div class="item normal" v-if="index > 2">
          <div class="inner-item">
            <div class="nums">{{ index + 1 }}</div>
            <div class="imgs" @click="toProfile(item.userBase.uId)">
              <img :src="item.userBase.portraitUrl" alt />
            </div>
            <!-- <div class="info"> -->
            <p class="title fh">{{ item.userBase.nickName }}</p>
            <!-- <span :class="getStagClass(item.userBase.sex)"></span>
            <span :class="getGradeClass(item.userZhibo.grade)">{{item.userZhibo.grade}}</span>-->
            <p class="jifen">{{ prefixTag }}{{ item.score }}{{ tags }}</p>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { assetsUrl } from '@config'
// import { toProfile, getStagClass, getGradeClass } from '@lib/common/config/baobaoUtils'
import { toProfile } from '@lib/common/config/baobaoUtils'
const imgSource = {
  jiangpai_1: assetsUrl + '/npic/w/9/20200116163305_f17b16dfb96bf19434df9eec81ebbab8',
  jiangpai_2: assetsUrl + '/npic/w/9/20200116163310_69ce4304361e4b748f1b0c4fde163155',
  jiangpai_3: assetsUrl + '/npic/w/9/20200116163308_dbe499c5ffb2ed3056a325cd1a4e8e32'
}
export default {
  data () {
    return {
      tags: '积分',
      imgSource
    }
  },
  components: {

  },
  props: {
    headfont: {
      type: String,
      default: '啦啦'
    },
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
  watch: {
    tag: {
      immediate: true,
      handler () {
        this.tags = this.tag
      }
    }
  },
  computed: {

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

img {
  display: block;
}

.list-none {
  min-height: 200px;
  height: 100%;
  color: rgba(255, 34, 120, 0.5);
  font-size: 28px;
}

.list {
  // padding: 0px 0px 65px;
  position: relative;
}

.item {
  // background: #ffeaca;
  margin-top: -1px;
  color: #262626;

  &.normal {
    padding: 20px 74px 20px 90px;
  }

  .nums {
    width: 70px;
    font-size: 36px;
    // color: transparent;
    font-style: italic;
    // -webkit-background-clip: text;
    // background-clip: text;
    // -webkit-text-fill-color: transparent;
    // background-image: linear-gradient(to top, #a132f5, #c400e7);
    padding-right: 10px;
    background-image: linear-gradient(to top, #EC648F, #FE9AB5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // font-size: 30px;
    // font-weight: 900;
    // padding-left: 0;
    // text-align: right;
    // width: 34px;
    // margin-right: 16px;
    // background-image: linear-gradient(to bottom, #ff7bf3, #a977ff);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // padding-right: 3px;
  }

  .title {
    vertical-align: middle;
    // font-size: 28px;
    display: inline-block;
    line-height: 36px;
    height: 33px;
    max-width: 200px;
    font-size: 26px;
    color: #262626;
    flex: 1;
  }

  span {
    min-height: 24px;
    display: inline-block;
  }

  .inner-item {
    // display: inline-block;
    // vertical-align: middle;
    display: flex;
    // width: 100%;
    align-items: center;
  }

  .imgs {
    margin-right: 40px;
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .jifen {
    // margin-top: 18px;
    font-size: 24px;
    color: #F06F97;
    line-height: 1.25;
    white-space: nowrap;
    flex: 1;
    text-align: right;
  }

  .info {
    display: inline-flex;
    // max-width: 320px;
    // display: flex;
    justify-content: space-between;
    flex: 1;
  }
}

.all-list {
  // margin-top: -160px;
}

.main-list {
  border-radius: 15px;
  // margin-top: 23px;
  // background: #fff;
  padding: 20px 0 20px;
  // box-shadow: inset 0px 53px 169px 0 #FFEFCC;
}

.jun {
  position: relative;
  border-radius: 15px;
  // box-shadow: inset 0px 53px 169px 0 #FFEFCC;
  // background-color: #ffffff;
  box-sizing: border-box;
  padding: 40px 0 60px;

  &:after {
    content: '';
    clear: both;
    display: block;
    height: 0;
  }

  .item {
    // float left
    border-radius: 10px;

    .imgs {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .title {
      margin-bottom: 8px;
      display: block;
    }

    &.one {
      box-sizing: border-box;
      margin: 0 11px;
      position: relative;
      // box-shadow: inset 0px 5px 0 0 #ffc429;
      padding: 31px 0 0;
      width: 235px;
      height: 303px;
      border-radius: 10px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;

      .imgs {
        width: 140px;
        height: 140px;
        margin-bottom: 43px;

        img {
          border: 6px solid #ffe766;
          transform: translate(-3px, -3px);
        }
      }

      .nums {
        z-index: 1;
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: block;
        width: 79px;
        height: 60px;
        background: url('http://pws.myhug.cn/npic/s/9/ff5839043573b7382cba6525664726031b2d7aaf4fd1bc') no-repeat center / cover;
      }

      .rank-index {
        z-index: 1;
        font-size: 28px;
        color: #666;
        box-sizing: border-box;
        padding-top: 0px;
        position: absolute;
        top: 160px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: block;
        width: 169px;
        height: 41px;
        background: url('http://pws.myhug.cn/npic/s/9/ff58395779231ccf7b031b8408271264fdcee9d62bd4bc') no-repeat center / cover;
      }
    }

    &.two {
      position: absolute;
      margin-top: 24px;
      text-align: center;
      left: 0px;
      bottom: 40px;
      width: 206px;
      height: 278px;
      box-sizing: border-box;

      // box-shadow: inset 0px 5px 0 0 #ffc429;
      .imgs {
        margin-bottom: 33px;
        margin-top: 26px;
        width: 118px;
        height: 118px;

        img {
          border: 4px solid #becdf1;
          transform: translate(-2px, -2px);
        }
      }

      .inner-item {
        position: relative;
        width: 100%;
      }

      .nums {
        z-index: 1;
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: block;
        width: 66px;
        height: 50px;
        background: url('http://pws.myhug.cn/npic/s/9/ff583930b49f3e97a76d2252ec37e23e28a36c2f86129a') no-repeat center / cover;
      }

      .rank-index {
        z-index: 1;
        font-size: 25px;
        color: #666;
        box-sizing: border-box;
        padding-top: 0px;
        position: absolute;
        top: 130px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: block;
        width: 126px;
        height: 34px;
        background: url('http://pws.myhug.cn/npic/s/9/ff58392737ebbd1ca631240e5e6de18c80f8bd1639ccbc') no-repeat center / cover;
      }
    }

    &.three {
      left: auto;
      right: 0;

      .imgs {
        img {
          border: 4px solid #fdd3a3;
          transform: translate(-2px, -2px);
        }
      }

      .nums {
        background: url('http://pws.myhug.cn/npic/s/9/ff58395bacf218a0c6d41bb23cb96b97a76d22ff9e1e9a') no-repeat center / cover;
      }

      .rank-index {
        background: url('http://pws.myhug.cn/npic/s/9/ff5839c266014764fdcee97d59cde81ca63124a32cc8bc') no-repeat center / cover;
      }
    }
  }
}

.userStagGirlas {
  widows: 100%;
}

.userGrade {
  box-sizing: border-box;
  height: 33px;
  padding-top: 1px;
  padding-bottom: 6px;
  line-height: 33px;
  padding-left: 41px;
  padding-right: 10px;
  font-weight: 400;
  font-size: 22px;
  margin-left: 10px;
}

.userStag {
  width: 32px;
  height: 33px;
  padding: 0 1.5px;
  margin-left: 10px;
}

.userStagBoy {
  background-color: #6fbaf7;
}

.hasMine {
  padding-bottom: 220px;
}

.item-top-3 {
  &.item {
    border-radius: 10px;
    background-color: #FDEFF4;
    width: 616px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 0;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding-right: 10px;
  }

  .nums {
    // height: 50px;
    // background-size: 53px 48px;
    // background-repeat: no-repeat;
    font-size: 60px;
    font-weight: 900;
    padding-left: 16px;
    // text-align: right;
    width: 82px;
    // margin-right: 34px;
    height: 72px;
    line-height: @height;
  }

  .imgs {
    width: 120px;
    height: 120px;
    position: relative;

    img {
      box-shadow: 0px 0px 0px 4px #EC648F;
    }

    .wangguan {
      position: absolute;
      right: 6px;
      top: -34px;
      // background-image: url('http://pws.myhug.cn/npic/s/9/ff583929171a25ba658d141fb5e7462d7aaf4f65fdd297');
      bg-size(59px, 49px);
    }
  }
}
</style>
