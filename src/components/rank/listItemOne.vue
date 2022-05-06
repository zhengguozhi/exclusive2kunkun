<!--
 * @Author: xuxueliang
 * @Date: 2019-11-29 15:26:25
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-06-08 18:17:57
 -->
<template>
  <div class="card" :class="'top_'+(i+1)">
    <div class="num-index dib tc">{{i>2?i+1:''}}</div>
    <div @click="toProfile(item.userBase.uId)" class="tou bsbb dib" :class="{first:i==0,small:i>2}">
      <div class="crown" :class="'crown-'+(i+1)"></div>
      <img :src="item.userBase.portraitUrl" alt class="tx" :class="{top2: i === 1 || i === 2}" />
      <div class="foot"></div>
    </div>
    <div class="info dib">
      <p class="name fh dib">{{item.userBase.nickName}}</p>
      <span :class="{span3: i < 3,span_leave: i>2}">{{item.score}} {{itemTip}}</span>
      <!-- <span :class="item.user.stagClassFlag"></span> -->
      <!-- <span :class="item.user.gradeClassFlag">{{item.user.userZhibo.grade}}</span> -->
      <!-- <p class="liwu">{{item.score}} {{itemTip}}</p> -->
    </div>
  </div>
</template>

<script>
// import { getStagClass, getGradeClass, toProfile } from '@lib/common/config/baobaoUtils'
import { toProfile } from '@lib/common/config/baobaoUtils'
export default {
  name: '',
  props: {
    item: Object,
    i: Number,
    itemTip: {
      type: String,
      default: '积分'
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.user)
  },
  methods: {
    toProfile: function (uId) {
      toProfile(uId)
      // var url = 'baobao://profile#{"uId":"' + uId + '","yUId":"' + uId + '"}'
      // console.log(url)
      // location.assign(url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.bsbb {
}

.dib {
  display: inline-block;
  vertical-align: middle;
}

.num-index {
  max-width: 80px;
  min-width: 80px;
  // color: #262626;
  color: rgba(255, 92, 108, 0.8);
  font-size: 36px;
  font-style: italic;
}

.tou {
  max-width: 141px;
  position: relative;

  img.tx {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    // border: 1px solid #ffffff;
    box-shadow: 0 0 0 3px #fff;
  }

  img.top2 {
    width: 120px;
    height: 120px;
  }

  &.small {
    img.tx {
      width: 100px;
      height: 100px;
    }
  }
}

.info {
  margin-left: 31px;
  max-width: 400px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  .span3 {
    font-size: 23px;
    color: #c43037;
    float: right;
  }

  .span_leave {
    font-size: 23px;
    color: #ff5c6c;
    float: right;
    margin-right: 20px;
    white-space: nowrap;
  }
}

.name {
  max-width: 240px;
  // min-width: 240px;
  font-size: 28px;
  color: #262626;
  line-height: 1.32;
}

.liwu {
  margin-top: 23px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.25;
  opacity: 0.8;
  font-size: 24px;
}

img.the-first {
  position: absolute;
  width: auto;
  height: 44px;
  top: -28px;
  right: 0px;
}

.top_1 {
  display: block;
  background: none;

  .tou {
    width: 151px;
    max-width: 160px;
    height: 196px;
    display: block;
    position: relative;
    padding-top: 42px;
    padding-left: 3px;
    margin-bottom: 17px;

    .crown {
      top: 4px;
      right: 0;
      width: 90px;
      height: 65px;
      position: absolute;
      background: url('http://pws.myhug.cn/npic/w/9/20200603113151_4bfe95bef474d5fbaec47ac86c235717') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff58393eeb10adb2dc9d84e5c859446941e839c2c1637d) no-repeat center center/ cover ;
    }

    .foot {
      bottom: 0;
      right: 0;
      width: 151px;
      height: 41px;
      position: absolute;
      background: url('http://pws.myhug.cn/npic/w/9/20200603113914_0f906a19e02b3e1c3ea0ed445c1ca3be') no-repeat center center / cover; // pws.myhug.cn/npic/s/9/ff58393eeb10adb2dc9d84e5c859446941e839c2c1637d) no-repeat center center/ cover ;
    }
  }

  .name {
    font-size: 29px;
    max-width: 100%;
    min-width: 100%;
  }

  width: 160px;
  margin: 0 auto;
  text-align: center;

  .info {
    display: block;
    margin-left: 0;

    span {
      float: none;
    }
  }
}

.top_2 {
  @extend .top_1;
  float: left;
  margin-top: -45%;
  margin-left: 25px;

  .tou {
    height: 160px;
    padding-top: 32px;
    padding-left: 5px;

    .crown {
      width: 75px;
      height: 55px;
      top: -2px;
      right: 8px;
      background-image: url('http://pws.myhug.cn/npic/w/9/20200603114132_13f19dde0a5c4eae8580c53b24ffd6ed'); // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
    }

    .foot {
      bottom: -4px;
      background-image: url('http://pws.myhug.cn/npic/w/9/20200603114133_6f5b252955055e056066e8b63a1e6a96'); // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
    }
  }
}

.top_3 {
  @extend .top_1;
  margin-top: -45%;
  float: right;
  margin-right: 15px;

  .tou {
    height: 160px;
    padding-top: 33px;
    padding-left: 3px;

    .crown {
      width: 75px;
      height: 55px;
      top: 2px;
      right: 8px;
      background-image: url('http://pws.myhug.cn/npic/w/9/20200603114244_c98e1fca05f50fdc623938000eef49cb'); // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
    }

    .foot {
      bottom: -6px;
      background-image: url('http://pws.myhug.cn/npic/w/9/20200603114244_ac0e2e822deb783be19fab3391626a5b'); // pws.myhug.cn/npic/s/9/ff5839de0dd8b7fd3713f92ef8f64cb21757da2af7a90a)
    }
  }
}

.top_4 {
  clear: both;
  margin-top: 40px;
}

.top_0 {
  background: none;
}

.top_leave {
  width: 590px;
}
</style>
