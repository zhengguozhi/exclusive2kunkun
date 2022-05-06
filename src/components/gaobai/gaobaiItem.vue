<template>
  <div class="list-item bsbb mc pos-r">
    <p v-show="isMyGaobai" class="user">
      {{item.toText && item.toText.length > 0 ? 'To' : 'From'}}:
      <img
        v-if="!noHead"
        class="user-head"
        :src="item.toText && item.toText.length > 0 ? item.toPortrait : item.fromPortrait"
      />
      <span>{{item.toText && item.toText.length > 0 ? item.toText : item.fromText}}</span>
    </p>
    <p v-show="!isMyGaobai" class="user">
      To:
      <img v-if="!noHead" class="user-head" :src="item.toPortrait" />
      <span>{{item.toText}}</span>
    </p>
    <div class="content-box bsbb">
      <div class="content pos-r mc">
        <div class="f-l pos-a">“</div>
        <div class="f-r pos-a">”</div>
        <p>{{item.content}}</p>
      </div>
    </div>
    <p v-show="!isMyGaobai" class="user">
      From:
      <img v-if="!noHead" class="user-head" :src="item.fromPortrait" />
      <span>{{item.fromText}}</span>
    </p>
    <div v-show="!isMyGaobai" class="like-box bsbb flex-center" @click="likeHanddle">
      <div class="heart-icon"></div>
      <div class="like-num flex-center">{{item.likeNum}}</div>
    </div>
    <div v-show="isMyGaobai" class="my-like-box bsbb flex">当前票数 {{item.likeNum}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {

  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    noHead: {
      type: Boolean,
      dafault: false
    },
    types: String,
    isMyGaobai: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    likeHanddle () {
      this.$emit('likeEmit', { id: this.item.id, types: this.types }, {})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@lib/common/stylus/variable.styl';
@import '~@lib/common/stylus/mixin.styl';

.list-item {
  padding: 24px;
  padding-bottom: 45px;
  background-color: #FFCCD6;
  width: 559px;
  border-radius: 10px;
  margin-bottom: 20px;

  .user {
    font-size: 24px;
    color: #ffffff;

    .user-head {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      position: relative;
      top: 10px;
    }

    span {
      color: #ff2278;
    }
  }

  .content-box {
    padding-top: 43px;
    padding-bottom: 57px;

    .content {
      width: 449px;
      font-size: 30px;
      color: #ffffff;
      line-height: 1.6;

      .f-l, .f-r {
        font-size: 48px;
        color: rgba(255, 255, 255, 0.36);
      }

      .f-l {
        top: -15px;
        left: -35px;
      }

      .f-r {
        bottom: -35px;
        right: -15px;
      }
    }
  }

  .like-box {
    position: absolute;
    bottom: 25px;
    right: 25px;
    width: 181px;
    height: 60px;
    border-radius: 30px;
    // background-image: linear-gradient(to right, #ff34db, #d312f6 98%);
    background-color: #ff2278;
    align-items: center;
    padding: 0 26px;
    // box-shadow: 0 0 29px 0 rgba(255, 255, 255, 0.5) inset;
    // background-image: linear-gradient(to top, #ffbf3e, #ffda3e);
    background-image: url('http://pws.myhug.cn/npic/w/9/20200512115020_e91745c5f9a6a3de2af3df7516a6658f');
    background-size: 181px 60px;
    padding-bottom: 6px;

    .heart-icon {
      background-image: url('http://pws.myhug.cn/npic/s/9/ff58397906249f9a331a21e1d7b3e3fd3713f98907b5c8');
      bg-size(38px, 32px);
      margin-right: 14px;
    }

    .like-num {
      font-size: 28px;
      color: #fff;
    }
  }

  .my-like-box {
    position: absolute;
    bottom: 25px;
    right: 25px;
    width: 181px;
    height: 60px;
    font-size: 25px;
    color: #ffffff;
    align-items: center;
  }
}
</style>
