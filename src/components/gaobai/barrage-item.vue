<template>
  <div class="barrage-item-out">
    <div :id="ID" class="barrage-item"></div>
    <!-- <div class="newadd-barrage-item pos-r">
      <div class="user-head pos-a">
        <img src="http://pws.myhug.cn/npic/p/9/ff58397c9355b6494d1e1041b00a04e625e8df5439eae0" />
      </div>
      <span class="yellow">小米</span>向
      <span class="yellow">微光</span>告白:喜欢你
    </div>-->
  </div>
</template>
<script>
export default {
  name: 'barrage-item',
  props: {
    time: {
      type: Number
    },
    list: {
      type: Array
    },
    height: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      IDList: [],
      waitUseList: [],
      lastBox: null,
      ID: 'barrage-item',
      count: 0,
      barrageItem: null,
      barrageItemWid: null
    }
  },
  methods: {
    addBox (val) {
      if (val) {
        if (this.lastBox) {
          if (parseInt(this.lastBox.style.right) < 0) {
            return
          }
        }
        let parm = {}
        let box = null
        let speed = 1// 默认速度 1
        let quicklyshow = 0// 标记其后面的item是否需要快速展示
        // 取随机概率是否快速展示
        let number = this.rnd(1, 2)
        if (+number === 1) {
          quicklyshow = 1
        }
        if (this.lastBox) {
          let boxquicklyshow = this.lastBox.getAttribute('quicklyshow')
          if (+boxquicklyshow === 1) {
            let boxfinish = this.lastBox.getAttribute('finish')
            if (+boxfinish === 1) {
              speed = 1 // 2
              quicklyshow = 0
            } else {
              return
            }
          }
        }
        if (this.waitUseList.length > 0) {
          let ID = this.waitUseList[0].ID
          parm = {
            ID: ID,
            speed: speed
          }
          this.waitUseList.shift()
          box = document.getElementById(ID)
          if (box) {
            // box.innerHTML = "<span class='barrage-item-box-text'>" + val + '</span>'
            box.innerHTML = `<div class="newadd-barrage-item pos-r">
      <div class="user-head pos-a">
        <img src="${val.fromPortrait }" />
      </div>
      <span class="yellow">${val.fromText }</span>
      向
      <span class="yellow">${val.toText }</span>
      告白:
      ${ val.content }
    </div>`
          }
        } else {
          let ID = 'barrage-item-' + this.index + '-' + (new Date()).getTime()
          parm = {
            ID: ID,
            speed: speed
          }
          box = document.createElement('span')
          if (!box) {
            return
          }
          box.setAttribute('ID', ID)
          box.setAttribute('class', 'barrage-item-box')
          // box.innerHTML = `<span class='barrage-item-box-text'>${ val }</span>`
          box.innerHTML = `<div class="newadd-barrage-item pos-r">
      <div class="user-head pos-a">
        <img src="${val.fromPortrait }" />
      </div>
      <span class="yellow">${val.fromText }</span>
      向
      <span class="yellow">${val.toText }</span>
      告白:
      ${ val.content }
    </div>`
          this.barrageItem.appendChild(box)
        }
        if (!box) {
          return
        }
        box.setAttribute('quicklyshow', quicklyshow)
        box.setAttribute('finish', '0')

        let boxWid = box.clientWidth
        box.style.right = '-' + (boxWid + 10) + 'px'
        this.IDList.push(parm)
        this.lastBox = box
      }
    },
    rnd (n, m) {
      var random = Math.floor(Math.random() * (m - n + 1) + n)
      return random
    },
    loopInter () {
      window.RAF(this.loopInter)
      this.count = this.count + 1
      if (window.isInData) { // 单线程控制
        return
      }
      // 判断频率
      if (this.count <= this.rnd(10, 150)) { // 控制间隔
        return
      }
      this.count = 0
      window.isInData = true
      if (typeof window.currentIndex === 'undefined') {
        window.currentIndex = -1
      }
      window.currentIndex = window.currentIndex + 1
      if (window.currentIndex >= this.list.length) {
        window.currentIndex = 0
      }
      let _text = this.list[window.currentIndex]
      this.addBox(_text)
      window.isInData = false
    },
    loopRoll () {
      window.setInterval(() => {
        this.move()
      }, 10)
    },
    move () {
      if (window.isMove) {
        return
      }
      window.isMove = true
      let ele = null
      let item = null
      let _IDList = []
      for (let i = 0; i < this.IDList.length; i++) {
        item = this.IDList[i]
        ele = document.getElementById(item.ID)
        if (ele) {
          let _cr = ele.style.right
          let speed = item.speed
          _cr = parseInt(_cr) + 1 * speed
          ele.style.right = _cr + 'px'
          if (_cr > this.barrageItemWid + 10) {
            // 清除该盒子
            // ele.parentNode.removeChild(ele);
            ele.setAttribute('finish', '1')
            this.waitUseList.push(item)
          } else {
            _IDList.push(item)
          }
        }
      }
      this.IDList = _IDList
      window.isMove = false
    }
  },
  created: function () {
    this.ID = this.ID + this.index
    console.log('this.ID', this.ID)
  },
  mounted: function () {
    this.barrageItem = document.getElementById(this.ID)
    this.$nextTick(() => {
      // this.barrageItem.style.lineHeight = this.height + 'px'
      this.barrageItemWid = parseInt(window.getComputedStyle(this.barrageItem, null)['width'])
      window.RAF(this.loopInter)
      this.loopRoll()
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.barrage-item-box {
  position: absolute;
  white-space: nowrap;
  top: 0;
  right: -100%;
  // height: 100%;
  display: inline-block;
}

.barrage-item-box-text {
  padding: 2 / $rem 12 / $rem;
  border-radius: 6 / $rem;
  background-color: rgba(0, 0, 0, 0.6);
}

.newadd-barrage-item {
  box-sizing: border-box;
  padding: 15px 22px 15px 70px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 32px;
  display: inline-block;
  font-size: 28px;
  color: #ffffff;

  .user-head {
    width: 60px;
    height: 60px;
    top: 0px;
    left: 0px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  .yellow {
    color: #ff2278;
  }
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

$rem = 50rem;

.barrage-item {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.barrage-item-out {
  height: 100%;
}
</style>
