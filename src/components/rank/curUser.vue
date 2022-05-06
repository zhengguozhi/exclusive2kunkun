<template>
  <div class="list bottom-show-list" v-if="currUser.userBase">
    <div class="item normal">
      <div class="inner-item">
        <div class="nums">{{currUser.rank && showRank ? currUser.rank: ''}}</div>
        <div class="imgs" @click="toProfileHandle(currUser.userBase.uId)">
          <img :src="currUser.userBase.portraitUrl" alt />
        </div>
        <div class="info">
          <p class="title fh">{{currUser.userBase.nickName}}</p>
          <!-- <span :class="getStagClass(currUser.userBase.sex)"></span> -->
          <!-- <span :class="getGradeClass(currUser.userZhibo.grade)">{{currUser.userZhibo.grade}}</span> -->
          <p class="jifen">{{currUser.score}} {{tags}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStagClass, getGradeClass, toProfile } from '@lib/common/config/baobaoUtils'
export default {
  data () {
    return {
      tags: '积分'
    }
  },
  components: {},
  props: {
    headfont: {
      type: String,
      default: '啦啦'
    },
    currUser: {
      type: Object,
      default () {
        return {}
      }
    },
    giftName: {
      type: String,
      default: ''
    },
    showRank: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    giftName: {
      immediate: true,
      handler () {
        this.tags = this.giftName
      }
    }
  },
  computed: {},
  mounted () { },
  methods: {
    toProfileHandle: function (uId) {
      toProfile(uId)
      // var url = 'baobao://profile#{"uId":"' + uId + '","yUId":"' + uId + '"}'
      // console.log(url)
      // location.assign(url)
    },
    getStagClass (tag) {
      return getStagClass(tag)
    },
    getGradeClass (grade) {
      return getGradeClass(grade)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';
@import '~@lib/common/stylus/baobao.styl';

.list {
  // padding: pageScaleByBase(0px, 2) pageScaleByBase(0px, 2) pageScaleByBase( 25px, 2);
  position: relative;
}

.bottom-show-list {
  position: absolute;
  // z-index: 5;
  bottom: 0;
  right: 0;
  left: 0;

  // padding: 0;
  .item {
    // background-color: #f6e69e;
    padding: pageScaleByBase(24px, 2) pageScaleByBase(38px, 2);
    // background: #fff;
    // box-shadow: inset pageScaleByBase( 0px, 2) pageScaleByBase( 15px, 2) pageScaleByBase( 95px, 2) 0 #f8db9a;
    border-top-left-radius: pageScaleByBase(20px, 2);
    border-top-right-radius: pageScaleByBase(20px, 2);
    // background-color: rgba(66, 35, 135, 0.8);
    // border: solid pageScaleByBase( 4px, 2) #730101;
    // background-color: #ff2942;
  }
}

.item {
  // background: #ffeaca;
  margin-top: pageScaleByBase(-1px, 2);
  color: #262626;

  &.normal {
    // padding: pageScaleByBase( 40px, 2) pageScaleByBase( 40px, 2) pageScaleByBase( 40px, 2) pageScaleByBase( 60px, 2);
  }

  .nums {
    font-size: pageScaleByBase(32px, 2);
    line-height: 1.16;
    color: rgba(255, 255, 255, 0.7);
    width: pageScaleByBase(80px, 2);
    box-sizing: border-box;
    padding-left: pageScaleByBase(10px, 2);
  }

  .title {
    vertical-align: middle;
    font-size: pageScaleByBase(28px, 2);
    display: inline-block;
    line-height: pageScaleByBase(36px, 2);
    height: pageScaleByBase(33px, 2);
    max-width: pageScaleByBase(180px, 2);
    // color: #262626;
    color: #FFFFFF;
  }

  span {
    min-height: pageScaleByBase(24px, 2);
    display: inline-block;
  }

  div {
    display: inline-block;
    vertical-align: middle;
  }

  .imgs {
    margin-right: pageScaleByBase(40px, 2);
    width: pageScaleByBase(100px, 2);
    height: pageScaleByBase(100px, 2);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      // border: pageScaleByBase( 3px, 2) solid #ffffff;
      // box-shadow: pageScaleByBase( 0px, 2) pageScaleByBase( 0px, 2) pageScaleByBase( 20px, 2) #ffffff;
    }
  }

  .jifen {
    // margin-top: pageScaleByBase( 18px, 2);
    font-size: pageScaleByBase(24px, 2);
    // color: #e13f3b;
    line-height: 1.25;
    // color: rgba(255, 255, 255, 0.75);
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
  }

  .info {
    display: inline-flex;
    align-items: center;
    width: pageScaleByBase(350px, 2);
    justify-content: space-between;
  }
}

.userGrade {
  margin-left: pageScaleByBase(10px, 2);
}

.userStag {
  margin-left: pageScaleByBase(10px, 2);
}
</style>
