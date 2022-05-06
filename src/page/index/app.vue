<!--
 * @Author: zhengguozhi
 * @Date: 2020-06-02 14:37:49
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2021-06-04 18:42:26
-->
<template>
  <navContent :needFull="false" title="困困专属" @click.stop>
    <div class="banner-page bsbb mc pos-r">
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item icon="search">工具箱</van-tabbar-item>
        <van-tabbar-item icon="friends-o">黑板报</van-tabbar-item>
        <van-tabbar-item icon="setting-o">照片墙</van-tabbar-item>
      </van-tabbar>
      <div class="container">
        <!-- <transition name="van-slide-right"> -->
        <!-- <div v-show="visible">Slide Right</div> -->
        <div v-show="active == 0" class="page page-0">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>困困专属app</van-swipe-item>
            <van-swipe-item>66亲手打造</van-swipe-item>
            <van-swipe-item>每天想你一点点</van-swipe-item>
          </van-swipe>
          <div class="mb-30"></div>
          <van-notice-bar
            left-icon="volume-o"
            text="每天想你一点点，每天想你一点点，每天想你一点点，每天想你一点点，每天想你一点点"
          />
          <div class="mb-50"></div>
          <div class="see-again">
            <van-row justify="center" align="center">
              <van-col span="24">
                <div class="flex flex-center">
                  <span class="fs-26">距离见面还有</span>
                  <van-count-down
                    :time="time"
                    format="DD 天 HH 时 mm 分 ss 秒"
                  />
                  <!-- <span class="fs-26">天</span> -->
                </div>
              </van-col>
            </van-row>
            <div class="mb-60"></div>
            <div class="meet-progress">
              <div class="mb-10">
                上次见面
                {{
                  `${lastTime.getFullYear()}.${
                    lastTime.getMonth() + 1
                  }.${lastTime.getDate()}`
                }}
              </div>
              <div class="mb-10">
                <van-progress
                  pivot-text="距离见面进度"
                  color="#ee0a24"
                  :percentage="meetPercent"
                />
              </div>
              <div class="tr">
                下次见面
                {{
                  `${nextTime.getFullYear()}.${
                    nextTime.getMonth() + 1
                  }.${nextTime.getDate()}`
                }}
              </div>
            </div>
            <div class="mb-60"></div>
            <img class="plane-ticket" :src="planeUrl" />
          </div>
        </div>
        <!-- </transition> -->
        <!-- <transition name="van-slide-right"> -->
        <!-- <div v-show="visible">Slide Right</div> -->
        <div v-show="active == 1" class="page page-1">
          <van-divider>工具箱</van-divider>
          <van-grid :column-num="2">
            <van-grid-item
              v-for="(v, i) in toolList"
              :key="i"
              :icon="v.icon ? v.icon : 'photo-o'"
              :text="v.name"
              @click="toolSelect(v)"
            />
          </van-grid>
          <transition name="van-slide-up">
            <!-- <div v-show="visible">Slide Up</div> -->
            <div v-show="toolBarShow">
              <van-divider>设定范围内生成随机数</van-divider>
              <van-divider>生成的随机数:{{ randomNum }}</van-divider>
              <van-form @submit="onSubmitGetRandom">
                <van-field
                  v-model="maxNum"
                  name="最大值"
                  label="最大值"
                  placeholder="最大值"
                  :rules="[{ required: true, message: '请填写最大值' }]"
                />
                <van-field
                  v-model="minNum"
                  name="最小值"
                  label="最小值"
                  placeholder="最小值"
                  :rules="[{ required: true, message: '请填写最小值' }]"
                />
                <div style="margin: 16px">
                  <van-button round block type="info" native-type="submit"
                    >获取随机数</van-button
                  >
                </div>
              </van-form>

              <!-- <van-cell @touchstart.native.stop="show = true"
                >弹出默认键盘</van-cell
              >
              <van-number-keyboard
                :show="show"
                @blur="show = false"
                @input="onInput"
                @delete="onDelete"
              /> -->
            </div>
          </transition>
        </div>
        <!-- </transition> -->
        <!-- <transition name="van-slide-right"> -->
        <!-- <div v-show="visible">Slide Right</div> -->
        <div v-show="active == 2" class="page page-2">
          <!-- <van-form @submit="onSubmitMsg">
                <van-field
                  v-model="msgId"
                  name="最大值"
                  label="最大值"
                  placeholder="最大值"
                  :rules="[{ required: true, message: '请填写最大值' }]"
                />
                <van-field
                  v-model="msgText"
                  name="最小值"
                  label="最小值"
                  placeholder="最小值"
                  :rules="[{ required: true, message: '请填写最小值' }]"
                />
                <div style="margin: 16px">
                  <van-button round block type="info" native-type="submit"
                    >获取随机数</van-button
                  >
                </div>
              </van-form> -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoadList"
          >
            <van-cell
              v-for="(item, index) in msgList"
              :key="index"
              :title="`${item.title}`"
              :value="item.value"
              :label="item.label"
              is-link
              center
              :url="item.url"
            />
          </van-list>
        </div>
        <!-- </transition> -->
        <!-- <transition name="van-slide-right"> -->
        <!-- <div v-show="visible">Slide Right</div> -->
        <div v-show="active == 3" class="page page-3">
          <van-divider>照片墙</van-divider>
          <div class="pic-list">
            <div class="pic-item" v-for="(v, i) in imgListRandom" :key="i">
              <img :src="v.img" @click="imgPreview(v)" />
            </div>
            <!-- <img class="pic-item" v-for="(v, i) in imgListRandom" :key="i" :src="v.img" @click="imgPreview(v.img)"></img> -->
          </div>
          <!-- <van-grid :column-num="2">
            <van-grid-item
              v-for="(v, i) in imgList"
              :key="i"
              :icon="v.icon ? v.icon : 'photo-o'"
              :text="v.name"
              @click="imgPreview(v.img)"
            />
          </van-grid> -->
          <!-- <van-circle
            v-model="currentRate"
            :rate="30"
            :speed="100"
            text="渐变"
            :color="gradientColor"
            size="120px"
            fill="#F7F8FA"
            layer-color="#F7F8FA"
          /> -->
          <!-- <van-image
            round
            width="10rem"
            height="10rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          /> -->
        </div>
        <!-- </transition> -->
      </div>
    </div>
    <div class="nav-box">
      <!-- <div class="nav-btn nav-btn-one flex-center" @click="toPage('gainTop')">
        主播榜
      </div>
      <div class="nav-btn nav-btn-two flex-center" @click="toPage('donateTop')">
        富豪榜
      </div> -->
    </div>
    <div v-for="(item, index) in imgSource" :key="index">
      <div :style="{ backgroundImage: 'url(' + item + ')' }"></div>
    </div>
    <div class="fix-bottom" slot="nav-bottom-fixed">
      <!-- <div class="foot-box bsbb">
        <curUser :currUser="selfUser" :giftName="config.giftName"></curUser>
      </div> -->
    </div>
  </navContent>
</template>

<script>
// import { topBanner, tabTpl, borderBg } from '@components/base/'
// import { curUser, listItemTwo, listItemThree } from '@components/rank/'
// import { giftProgress } from '@components/progress/'
import { navContent } from '@lib/components'
import { ImagePreview } from 'vant'
// import { statusHttp, gaintopHttp, donatetopHttp } from '@api'
import { assetsPrefix, isDev } from '@config'
import { isOldVersion, isAndroid, urlParam } from '@lib/eryuSdk'
import { getRandomNum } from '@lib/common/config/mUtils'
const initSqlJs = require('sql.js')
// import Toast from '@lib/plugins/Sloth/Toast/'
let imgSource = {
  bg: assetsPrefix + ''
}
export default {
  components: {
    navContent
    // topBanner,
    // tabTpl,
    // borderBg,
    // curUser,
    // listItemTwo,
    // listItemThree,
    // giftProgress: () => import(/* webpackChunkName: "giftProgress" */ '@components/progress/giftProgress'),
  },
  data () {
    return {
      imgSource,
      isAndroid,
      isOld: isOldVersion('8.3.0'),
      mainList: [],
      selfUser: {},
      config: {
        giftName: '积分'
      },
      yUId: '',
      activeIndex: 0,
      gameIsBegin: 0,
      bannerRound: 0,
      bundleTime: window.bundleTime,
      ISCONSOLE: location.href.search('__ISCONSOLE__') > -1,
      active: 0,
      toolList: [{
        name: '选择困难症服用',
        key: 'randomNum',
        icon: 'thumb-circle-o'
      }, {
        name: '待补充',
        key: ''
      }, {
        name: '待补充',
        key: ''
      }, {
        name: '待补充',
        key: ''
      }, {
        name: '待补充',
        key: ''
      }, {
        name: '待补充',
        key: ''
      }],
      list: [],
      loading: false,
      finished: false,
      imgList: [
        {
          img: assetsPrefix + '20220130154345_tc_1f4ddb2683fd600471b75325c7670a46',
          name: '图一'
        },
        {
          img: assetsPrefix + '20220130154346_tc_90e597d5e5335dcf8a61fe5452f4d1e0',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154352_tc_77530c0180fa60a0dd33fef455d97c0c',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154353_tc_5d396e48623c2ade33bb967b2eebcd11',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154349_tc_51154f0709a43217c901af18666f8598',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154554_tc_f4ff654abc866b90b450223f4e678a6d',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154351_tc_e8c0751c14ca665e8e5005579af997fa',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130154352_tc_6242c07660ba5d983c84d915ad800419',
          name: '待补充'
        },
        {
          img: assetsPrefix + '20220130155044_tc_265be26e9b47d38daa37b9530ed51c56',
          name: '待补充'
        }
      ],
      planeUrl: 'https://zhengguozhi.github.io/assetRepo/exclusive2kunkun/3271651836138.jpg',
      time: 30 * 60 * 60 * 1000,
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      toolBarShow: false,
      show: false,
      maxNum: '',
      minNum: '',
      randomNum: 0,
      lastTime: new Date('2022-03-20 21:10:00'),
      nextTime: new Date('2022-06-07 19:00:00'),
      meetPercent: 10,
      msgList: [],
      msgId: '',
      msgText: ''
    }
  },
  computed: {
    text () {
      return this.currentRate.toFixed(0) + '%'
    },
    imgListRandom () {
      var arr = []
      arr = [...this.imgList]
      // var rdNumArr = []
      // for (var i = 0; i < this.imgList.length; i++) {
      //   var rdNum = getRandomNum(0, this.imgList.length - 1)
      //   if (rdNumArr.indexOf(rdNum) < 0) {
      //     arr.push(this.imgList[rdNum])
      //     rdNumArr.push(rdNum)
      //   } else {
      //     i--
      //   }
      // }
      arr.sort(function () {
        return Math.random() - 0.5
      })
      return arr
    }
  },
  created () {
    // this.yUId = urlParam.yUId || ''
    // this.getStatus()
    // this.getDonateTopList()
  },
  // 加载数据
  mounted () {
    console.log(isDev, urlParam)
    if (isDev) {
      // this.active = 2
    }
    // console.log('initSqlJs--', initSqlJs)
    // Toast.showShortCenter('toast', '', 2000)
    this.onLoadList()
    this.getDownTime()
    this.getPercent()
    // this.getDb()
    this.getMsg()
  },
  // 相关操作事件
  methods: {
    getMsg () {
      this.msgList = [{
        title: '记录每天一件快乐的事',
        value: '去记录',
        label: '记录每一天令66和困困感到快乐的事情,快去记录小幸福吧~',
        url: 'https://shimo.im/docs/qwPcGHPKxr6hrwQX'
      },
      {
        title: '石墨文档',
        value: '去操作',
        label: '石墨文档操作中心',
        url: 'https://shimo.im/desktop'
      }, {
        title: '版本更新日志',
        value: '去记录',
        label: '记录app版本更新日志,更新日志会更新到石墨文档中',
        url: 'https://shimo.im/docs/XD6wvdydVCcXvjHr'
      }, {
        title: '待添加',
        value: '去记录',
        label: '待添加',
        url: ''
      }]
    },
    toAddress () {
      window.location.href = 'address.html'
    },
    toPage (url) {
      window.location.href = `${ url }.html#yUId=${ this.yUId }`
    },
    onChange (index) {
      // Notify({ type: 'primary', message: index })
      console.log(index)
    },
    onLoadList () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    imgPreview (v) {
      var imgListRandom = [...this.imgListRandom]
      var imgUrlList = []
      imgListRandom.forEach((item) => {
        if (item.img === v.img) {

        } else {
          imgUrlList.push(item.img)
        }
      })
      // console.log('imgListRandom', imgListRandom)
      ImagePreview([
        v.img,
        ...imgUrlList
      ])
    },
    toolSelect (v) {
      this.toolBarShow = true
    },
    onInput (value) {
      console.log(value)
    },
    onDelete () {
      console.log('删除')
    },
    onSubmitGetRandom (values) {
      console.log('submit', values)
      this.randomNum = getRandomNum(+this.maxNum, +this.minNum)
      console.log('randomNum', this.randomNum)
    },
    getDownTime () {
      console.log('new Date--', +this.nextTime - +new Date())
      this.time = +this.nextTime - +new Date()
    },
    getPercent () {
      this.meetPercent = Math.ceil((+new Date() - +this.lastTime) / (+this.nextTime - +this.lastTime) * 100)
      console.log('getPercent--', this.meetPercent)
    },
    async getDb () {
      const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/sql-wasm.wasm`
      })
      // const SQL = await initSqlJs({
      //   locateFile: file => `/static/wap/common/db/${ file }`
      // })
      const dataPromise = fetch('/static/wap/common/db/sql.db').then(res => res.arrayBuffer())
      const [buf] = await Promise.all([dataPromise])
      // console.log('buf--', new Uint8Array(buf), new SQL.Database(new Uint8Array(buf)))
      this.db = new SQL.Database(new Uint8Array(buf))
      // const db = new SQL.Database(new Uint8Array(dataPromise))
      // const db = new SQL.Database()
      const res = this.db.exec('SELECT * FROM employees')
      console.log('db-res-->', res)
      this.msgList = res[0].values
    },
    onSubmitMsg (values) {
      console.log('submit', values)
      let sqlstr = `INSERT INTO employees (id,name) VALUES (${ +this.msgId },${ encodeURIComponent(this.msgText) });`
      this.db.run(sqlstr)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

// @import '~@lib/components/assets/font/nav.font.css';

// html, body {
// height: 100%;
// background: transparent !important;
// // background: rgba(0, 0, 0, 0.35) !important;
// }
.div {
  font-size: 16px;
  background: $color-yellow;
}

.banner-page {
  width: 750px;
  min-height: 100%;

  // background-color: #FFEAA1;
  // padding-bottom: 170px;
  .container {
    .page {
      font-size: 36px;
      padding: 30px;
    }

    .page-0 {
      .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 36px;
        line-height: 360px;
        text-align: center;
        background-color: #F2CF42;
        text-shadow: 0 0 10px #780B82;
      }

      .see-again {
        .meet-progress {
          font-size: 26px;
        }

        .plane-ticket {
          width: 100%;
          padding-bottom: 60px;
        }
      }
    }

    .page-3 {
      .pic-list {
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;
        column-count: 3;
        column-gap: 10px;

        .pic-item {
          // float: left;
          // width: 32%;
          // height: auto;
          // display: block;
          // box-shadow: 0 0 10px 4px #F7F8FA;
          // max-height: 350px;
          margin-bottom: 10px;

          // margin-right: 6px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}

.nav-box {
  width: 132px;
  height: 110px;
  // background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 20%;
  right: 0;
  z-index: 2;

  .nav-btn {
    width: 132px;
    height: 48px;
    box-shadow: 2.3px 1.9px 0 0 rgba(252, 117, 59, 0.5);
    background-image: linear-gradient(to right, #f9d957, #5ebdff);
    margin-bottom: 14px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    font-size: 28.5px;
    color: #ffffff;

    &-two {
      background-image: linear-gradient(to right, #fc9540, #5ebdff);
    }
  }
}

.foot-box {
  width: 750px;
  height: 150px;
  border-radius: 26px 26px 0px 0px;
  box-shadow: 0px -4px 9.8px 0.2px rgba(221, 165, 45, 0.36);
  background-color: #fec96b;
  // cl();
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -375px;
}
</style>
