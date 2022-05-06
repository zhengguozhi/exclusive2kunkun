<!--
 * @Author: xuxueliang
 * @Date: 2020-05-07 17:33:20
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-08-20 17:09:34
 -->
<template>
  <div class="gift-progress mc" v-show="bolOnline == 1">
    <newProgress
      :blockColor="color1"
      height="12px"
      :showStepInfo="false"
      lineBack="#056d43"
      colorBegin="#f76c3b"
      colorEnd="#f76c3b"
      :step="step"
      :blockBorderColor="color1"
    >
      <div class="circle-list">
        <div
          class="circle-item"
          :style="[{boxShadow: '0 0 0 2px '+(currStep >= i?'#fef500': '#e7ef5f')},{background: (currStep >= i? colorList[i]: '#056d43')}]"
          v-for="(v, i) in btnList.length"
          :key="i"
        ></div>
      </div>
    </newProgress>
    <div class="flex show-money">
      <div class="span" v-for="(v, i) in btnList" :key="i">{{ parseToInt(v.money) }}</div>
    </div>
    <div class="next-info bsbb" v-show="nextMoneyStr">
      距离下一个奖励还差
      <span class="red">{{nextMoneyStr}}</span>
      <span>领取 {{btnText}}</span>
    </div>
    <div
      class="btn-gift flex-center mc"
      :class="{'btn-gift-on': rewardStep > 0}"
      @click="btnGiftHandle"
    ></div>
  </div>
</template>

<script>
import progress from '@lib/components/progress'
import { gradientColors } from '@lib/common/config/mUtils'
import { payinitHttp, payrewardHttp } from '@api'
import { isDev } from '@config'
import Toast from '@lib/plugins/Sloth/Toast/'
export default {
  data () {
    return {
      step: 0,
      list: [30, 188, 388, 888, 1688, 2888, 3888, 5888, 8888, 10000],
      color1: 'rgba(0,0,0,0)',
      currStep: 0,
      totalStep: 2,
      btnList: [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
      pageShow: false,
      bolOnline: 0,
      rewardStep: 0,
      btnText: '',
      nextMoneyStr: '',
      canClick: true,
      colorList: []
    }
  },
  components: { newProgress: progress },
  props: {
    hasNum: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    console.log('giftProgress-->')
    this.payinit()
    // for (let i = 0; i < this.list.length; i++) {
    //   if (this.hasNum <= this.list[i]) {
    //     this.step = i
    //     return
    //   }
    // }
  },
  methods: {
    payinit () {
      payinitHttp().then(res => {
        if (isDev) {
          res.bolOnline = 1
          res.totalStep = 7
          res.currStep = 2
          res.btnList = [{ nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }, { nextMoneyStr: '', money: 600 }]
          res.rewardStep = 1
          res.nextMoneyStr = '22'
        }
        res.totalStep = res.totalStep - 1
        res.currStep = res.currStep - 1
        this.bolOnline = res.bolOnline || 0
        this.btnList = res.btnList
        this.currStep = res.currStep
        this.totalStep = res.totalStep
        this.rewardStep = res.rewardStep
        this.nextMoneyStr = res.nextMoneyStr
        this.step = (res.currStep / res.totalStep) * 100
        this.canClick = true
        this.colorList = gradientColors('#f76c3b', '#f76c3b', res.btnList.length + 1)
        if (res.rewardStep > 0) {
          this.btnText = res.btnList[res.rewardStep - 1].rewardStr
        }
      })
    },
    payreward (type) {
      if (!this.canClick) return
      this.canClick = false
      payrewardHttp({ type }).then(res => {
        if (res.error.errno === 200) {
          Toast.showShortCenter('领取成功，请前往背包中查看', '', 2000)
          this.payinit()
        } else {
          this.canClick = true
          Toast.showShortCenter(res.error.usermsg, '', 2000)
        }
      })
    },
    btnGiftHandle () {
      if (this.rewardStep > 0) {
        this.payreward(this.btnList[this.rewardStep - 1].type)
      }
    },
    parseToInt (val) {
      return (val / 100).toFixed(0)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.line-inner {
  box-shadow: 0 0 0 3px #e7ef5f;
}

.progress-line {
  padding-bottom: 22px !important;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.gift-progress {
  margin-bottom: 24px;
  width: 606px;
}

.red {
  color: #f64371;
}

.circle-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -4px;
  left: 0;

  .circle-item {
    width: 18px;
    height: 18px;
    background-color: transparent;
    border-radius: 100%;
    box-shadow: 0 0 0 2px #fff;
    // position: absolute;
    // top: 0;
    // left: 0;
  }
}

.show-money {
  font-family: PingFangSC;
  padding: 0 0px;
  font-size: 28px;
  line-height: 2.25;
  text-align: center;
  color: #056D43;
  flex-wrap: no-warp;
  margin-bottom: -10px;
  position: relative;
  left: 6px;
  top: -20px;
  width: 588px;

  .span {
    flex: 1;
    white-space: nowrap;
    // max-width: 10%;
  }
}

.btn-gift {
  bg-size(287px, 95px);
  background-image: url('http://pws.myhug.cn/npic/w/9/20200616171912_ba16814b3739a9e96a695115fe1ef773');
  background-color: #9D9D9D;
  border-radius: 45px;
  font-size: 36px;
  font-weight: 600;
  // color: #ddd;
  color: #fff;
  filter: grayscale(0.99);

  // box-shadow: 0 0 30px 0 #656565 inset;

  // background-image: linear-gradient(to right, #4A4A4A, #9D9D9D 15%, #9D9D9D 85%, #4A4A4A);
  &-on {
    // background-image: url('http://pws.myhug.cn/npic/w/9/20200107175308_6e197f73f54421b9d3ffc7e7ba4979ae');
    // background-color: #FEC454;
    // box-shadow: 0 0 30px 0 #FD9C2D inset;
    // background-image: linear-gradient(to top, #a132f5, #d96af9);
    // text-shadow: 0px 2px 8px rgba(118, 15, 172, 0.98);
    // color: #2f0101;
    // text-shadow: -0.00133rem 0.02667rem 0.01333rem rgba(219, 124, 0, 0.5);
    // color: #fff;
    filter: grayscale(0);
  }
}

.next-info {
  font-size: 24px;
  // font-weight: 600;
  color: #b243f6;
  padding-left: 20px;
  margin-bottom: 10px;
}
</style>
