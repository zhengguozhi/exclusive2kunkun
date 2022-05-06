<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="cancel">
      <div class="confirm-wrapper" @click.stop>
        <div class="confirm-content bsbb pos-r">
          <!-- <div class="close" @click="cancel"></div> -->
          <span class="close iconfont icon-close" @click="cancel"></span>
          <div class="gaobai-modal bsbb">
            <div class="search-out-box bsbb">
              <div class="search-box flex bsbb mc">
                <!-- <div class="search-icon"></div> -->
                <input
                  type="number"
                  placeholder="输入抱抱号"
                  v-model="searchBBID"
                  @keyup.enter="searchUser"
                />
                <div
                  class="on-submit bsbb"
                  :class="searchBBID.length < 1 ? 'btnOff': ''"
                  @click="searchUser"
                >确认</div>
              </div>
            </div>
            <div class="content-out-box bsbb mc">
              <div class="to-user-box bsbb">
                To：
                <span class="to-user">{{nickNameTo}}</span>
              </div>
              <div class="textarea">
                <textarea maxlength="25" v-model="content" placeholder="请输入告白内容，请文明参与活动(25个字)"></textarea>
              </div>
            </div>
          </div>
          <radioGroup :radioList="radioList" @choose="chooseEmit"></radioGroup>
          <div class="operate">
            <div
              @click="addCheck"
              class="operate-btn"
              :class="nickNameTo.length < 1 ||  content.length < 1? 'operate-btn-off': ''"
            >{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
      <modalConfirm ref="modalConfirm" text="钻石不足，请充值" @confirm="modalConfirm" confirmBtnText="去充值"></modalConfirm>
      <modalInfo
        ref="modalInfo"
        :content="typeText[type]"
        width="500px"
        height="340px"
        cancelStr="取消"
        sureStr="确认"
        :closeShow="false"
        @confirm="add"
      ></modalInfo>
    </div>
  </transition>
</template>

<script>
import modalInfo from '@lib/components/modalInfo'
import { isDev } from '@config'
import radioGroup from '@components/gaobai/radioGroup'
import modalConfirm from '@components/gaobai/modalConfirm'
import { queryuserHttp, gaobaiaddHttp } from '@api'
import Toast from '@lib/plugins/Sloth/Toast/'
export default {
  props: {
    text: Object,
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
      content: '',
      type: 1, // 1-免费；2-52钻；3-1314钻；4-3344钻
      radioList: [{
        label: '当前直播间（免费）',
        isChecked: true,
        type: 1
      }, {
        label: '普通全站（52钻）',
        isChecked: false,
        type: 2
      }, {
        label: '高级全站（1314钻）',
        isChecked: false,
        type: 3
      }, {
        label: '深情全站（3344钻）',
        isChecked: false,
        type: 4
      }],
      typeText: {
        '2': '普通全站需要扣除52个钻石，是否发布',
        '3': '高级全站需要扣除1314个钻石，是否发布',
        '4': '深情全站需要扣除3344个钻石，是否发布'
      }
    }
  },
  components: {
    radioGroup,
    modalConfirm,
    modalInfo
  },
  mounted () {
    if (isDev) {
      // this.$refs.modalInfo.show()
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
    },
    searchUser () {
      console.log('searchBBID', this.searchBBID)
      if (this.searchBBID.length < 1) {
        Toast.showShortCenter('输入内容不能为空', '', 2000)
        return
      }
      queryuserHttp({ bbid: this.searchBBID }).then((res) => {
        if (res.error.errno === 200) {
          this.nickNameTo = res.userBase.nickName
        } else {
          Toast.showShortCenter(res.error.usermsg, '', 2000)
        }
      })
    },
    add () {
      // if (this.searchBBID.length < 1) {
      //   Toast.showShortCenter('输入内容不能为空', '', 2000)
      //   return
      // }
      if (this.nickNameTo.length < 1) {
        Toast.showShortCenter('请先查询要发送的抱抱号', '', 2000)
        return
      }
      if (this.content.length < 1) {
        Toast.showShortCenter('输入内容不能为空', '', 2000)
        return
      }
      let params = {
        yUId: this.yUId,
        bbid: this.searchBBID,
        content: this.content,
        type: this.type
      }
      gaobaiaddHttp(params).then((res) => {
        if (isDev) {
          // res = {
          //   error: {
          //     errno: 200
          //   },
          //   payUrl: 'https://www.baidu.com'
          // }
        }
        if (res.error.errno === 200) {
          if (res.payUrl) {
            this.payUrl = res.payUrl
            this.$refs.modalConfirm.show()
            return
          }
          this.hide()
          this.searchBBID = ''
          this.content = ''
          this.nickNameTo = ''
          Toast.showShortCenter('已提交审核，审核通过后自动发布', '', 2000)
        } else {
          Toast.showShortCenter(res.error.usermsg, '', 2000)
        }
      })
    },
    chooseEmit (item) {
      console.log('item', item)
      this.type = item.type
    },
    modalConfirm () {
      location.href = this.payUrl
    },
    addCheck () {
      if (this.type !== 1) {
        this.$refs.modalInfo.show()
      } else {
        this.add()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';
@import '~@lib/components/assets/font/nav.font.css';

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
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
    z-index: 9;

    .confirm-content {
      // width: 564px;
      // border-radius: 13px;
      // background: #fff;
      color: #510e18;
      width: 670px;
      height: 746px;
      border-radius: 20px;
      background-color: #fdc4d0;
      box-shadow: 0 0 29px 6px #FD9DA8 inset;
      padding-top: 88px;

      // border: solid 4px #730101;

      // background-color: #ff2942;
      .btnOff {
        // background-image: linear-gradient(to top, #d9d2e5, #fbe6fa) !important;
        color: #a9a9a9 !important;
        border: solid 2px #bfbfbf !important;
        background-image: linear-gradient(to top, #d6d2e6, #f5e6fb) !important;
      }

      .iconfont {
        font-size: 24px * 2;
      }

      .close {
        position: absolute;
        top: 20px;
        right: 30px;
        // background-image: url('http://pws.myhug.cn/npic/s/9/ff58392350353fdc36d872df5eedbbeee37fe25bfe02ec');
        bg-size(37px, 37px);
        color: #fe825c;
      }

      .search-out-box {
        padding-bottom: 36px;
      }

      .search-box {
        width: 559px;
        height: 71px;
        // border-radius: 10px;
        // background-color: #441695;
        // padding: 0 30px;
        align-items: center;
        justify-content: space-between;

        .search-icon {
          background-image: url('http://pws.myhug.cn/npic/s/9/ff583901715df5cee9d62be49855fb3124a32ce5bcc998');
          bg-size(30px, 30px);
          margin-right: 22px;
        }

        input {
          height: 100%;
          flex: 1;
          font-size: 24px;
          color: #ff2278;
          // background: transparent;
          outline: none;
          border-radius: 10px;
          background-color: #ffdae3;
          box-sizing: border-box;
          padding-left: 8px;
          placeholder(rgba(255, 34, 120, 0.3));
        }

        .on-submit {
          width: 141px;
          height: 60px;
          box-shadow: 0 0 29px 0 rgba(255, 255, 255, 0.5) inset;
          background-color: #C73DE7;
          border-radius: 30px;
          text-align: center;
          line-height: @height;
          font-size: 28px;
          // color: #ffffff;
          color: #fff;
          margin-left: 30px;
          border: solid 2px #b2005d;
          background-image: linear-gradient(to top, #ff1f73, #ff54b1);
        }
      }

      .content-out-box {
        width: 552px;
        height: 211px;
        border-radius: 10px;
        background-color: #ffd5df;
        padding: 23px;
        margin-bottom: 40px;

        .to-user-box {
          padding-top: 20px;
          padding-bottom: 20px;
          font-size: 24px;
          color: #ffffff;

          .to-user {
            color: #ff2278;
          }
        }

        .textarea {
          textarea {
            width: 100%;
            height: 100px;
            background: transparent;
            border: none;
            outline: none;
            font-size: 28px;
            color: #ff2278;
            placeholder(rgba(255, 34, 120, 0.3));
          }
        }
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

      .rule-top {
        height: 116px;
        text-align: center;
        border-bottom: 2px solid #e1e1e1;
        line-height: 116px;
        margin-bottom: 20px;
        font-size: $fs40;
        color: $dark-black;
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
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-medium-x;
        color: $color-red;
      }

      .operate {
        // display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;

        .operate-btn {
          background: url('http://pws.myhug.cn/npic/w/9/20200513202352_f58501ba4b6a16b3e6409fec28dff6c5');
          background-position: center;
          bg-size(245px, 82px);
          border-radius: 40px;
          // background-image: linear-gradient(to right, #ff34db, #d312f6 98%);
          margin: 0 auto;
          // box-shadow: 0 0 29px 0 rgba(255, 255, 255, 0.5) inset;
          background-color: #C73DE7;
          line-height: @height;
          color: #fff;
          font-size: 36px;

          // border: solid 2px #b2005d;
          // background-image: linear-gradient(to top, #ff1f73, #ff54b1);
          &.operate-btn-off {
            filter: grayscale(1);
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
