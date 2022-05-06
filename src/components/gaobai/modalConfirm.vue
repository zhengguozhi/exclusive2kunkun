<!--
 * @Author: zhengguozhi
 * @Date: 2019-09-24 16:43:23
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2019-12-04 21:22:14
 -->

<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="cancel">
      <div class="confirm-wrapper" @click.stop>
        <div class="confirm-content bsbb pos-r">
          <div class="close" @click="cancel"></div>
          <div class="text">{{text}}</div>
          <div class="operate">
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: String,
    confirmBtnText: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: ''
    },
    alertBtnNum: {
      type: Number,
      default: 1
    },
    yUId: String
  },
  data () {
    return {
      showFlag: false,
      searchBBID: '',
      nickNameTo: '',
      content: ''
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: $color-background-d;

  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;

    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .confirm-content {
      // width: 564px;
      // border-radius: 13px;
      // background: #fff;
      color: #510e18;
      width: 670px;
      height: 371px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 0 29px 0 #FFEFCC inset;
      padding-top: 88px;

      .btnOff {
        background-image: linear-gradient(to right, #d9d1e6, #fce5fb 99%);
        color: #a9a9a9 !important;
      }

      .close {
        position: absolute;
        top: 30px;
        right: 30px;
        background-image: url('http://pws.myhug.cn/npic/s/9/ff58392350353fdc36d872df5eedbbeee37fe25bfe02ec');
        bg-size(37px, 37px);
      }

      .close-icon {
        padding: 30px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        width: 30px;
        height: 30px;
      }

      .box {
        padding: 30px;

        .content {
          font-size: 28px;
          line-height: 1.6;
          padding-bottom: 10px;
          color: $dark-black;
        }
      }

      .text {
        padding: 19px 15px 50px;
        // line-height: 22px;
        text-align: center;
        font-size: 36px;
        color: $color-red;
      }

      .operate {
        // display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;

        .operate-btn {
          // flex: 1;
          // line-height: 22px;
          // padding: 10px 0;
          // height: 0.8rem;
          // border-top: 1px solid $color-background-d
          // color: $color-text-d;
          // background: url('http://pws.myhug.cn/static/wap/img/zww/btn_tanchuang_queren.png');
          // background-size: 2rem;
          background-repeat: no-repeat;
          background-position: center;
          // width: 361px;
          // height: 80px;
          border-radius: 40px;
          // background-image: linear-gradient(to right, #ff34db, #d312f6 98%);
          margin: 0 auto;
          // box-shadow: 0 0 29px 0 rgba(255, 255, 255, 0.5) inset;
          // background-color: #C73DE7;
          color: #fff;
          width: 250px;
          height: 67px;
          line-height: @height;
          border-radius: 30px;
          box-shadow: 0px 5px 0 0 rgba(196, 42, 8, 0.85);
          background-image: linear-gradient(to top, #ff8d00, #ffe400);
          text-shadow: 0px 2px 5px rgba(196, 42, 8, 0.89);
          font-weight: 600;
          font-size: 36px;

          &.left {
            // border-right: 1px solid $color-background-d
            background: url('http://pws.myhug.cn/static/wap/img/zww/btn_tanchuang_quexiao.png');
            background-size: 2rem;
            background-repeat: no-repeat;
            background-position: center;
            padding: 10px 0;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
