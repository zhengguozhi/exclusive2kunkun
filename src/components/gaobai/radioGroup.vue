<!--
 * @Author: zhengguozhi
 * @Date: 2019-12-04 18:37:18
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-05-12 16:34:15
 -->
<template>
  <div class="checkbox-box bsbb">
    <div class="radio-box" v-for="(item,index) in list" :key="index">
      <label class="label" :for="index">
        <div class="radio-container pos-r">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input
            :id="index"
            class="input-radio"
            :checked="item.isChecked"
            @click="checkOne(index)"
            type="radio"
          />
        </div>
        <div>{{item.label}}</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  components: {

  },
  props: {
    headfont: {
      type: String,
      default: '啦啦'
    },
    radioList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    radioList: {
      immediate: true,
      handler () {
        this.list = this.radioList
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    checkOne (index) {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].isChecked = false
      }
      this.list[index].isChecked = !this.list[index].isChecked
      console.log(this.list[index].isChecked)
      this.$emit('choose', this.list[index])
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.checkbox-box {
  padding-top: 25px;
  // padding-bottom: 65px;
  padding-left: 60px;
  display: flex;
  flex-wrap: wrap;

  .radio-box {
    width: 300px;
    display: flex;
    // justify-content: space-between;
    font-size: 24px;
    box-sizing: border-box;
    padding-right: 15px;
    color: $white;
    margin-bottom: 40px;

    .label {
      display: flex;
      align-items: center;
    }

    .radio-container {
      width: 20px;
      height: 20px;
      margin-right: 20px;

      .radio {
        display: block;
        width: 100%;
        height: 100%;
        // background-image: url('http://pws.myhug.cn/npic/s/9/ff583930238100e64f20783a5e799c2df8a9df60c785f2');
        background-size: 20px 44.5px;
        background-repeat: no-repeat;
        // background-position: 0 0;
        box-sizing: border-box;
        border: 1PX solid #fff;
        border-radius: 100%;
      }

      .input-radio {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
        -webkit-appearance: none;
        opacity: 0;
      }

      .on {
        // background-position: 0 -22px;
        background-color: #ff2479;
      }
    }
  }
}

.label {
  display: flex;
}
</style>
