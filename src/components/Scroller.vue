<template>
  <div ref="wrap" class="wrap">
    <div ref="content" class="content" :class="animationClass" :style="contentStyle" @animationend="onAnimationEnd" @webkitAnimationEnd="onAnimationEnd">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      default: ''
    },
    delay: {
      type: Number,
      default: 0.5
    },
    speed: {
      type: Number,
      default: 100
    }
  },
  mounted() {},
  data() {
    return {
      wrapWidth: 0,     //父盒子宽度
      firstRound: true, //判断是否
      duration: 0,      //css3一次动画需要的时间
      offsetWidth: 0,    //子盒子的宽度
      animationClass: '' //添加animate动画
    };
  },
  computed: {
    contentStyle() {
      return {
        //第一次从头开始,第二次动画的时候需要从最右边出来所以宽度需要多出父盒子的宽度
        paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px',
        //只有第一次的时候需要延迟
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      };
    }
  },
  watch: {
    content: {
      //监听到有内容,从后台获取到数据了,开始计算宽度,并计算时间,添加动画
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          this.wrapWidth = wrapWidth;
          this.offsetWidth = offsetWidth;
          this.duration = offsetWidth / this.speed;
          this.animationClass = 'animate';
        });
      }
    }
  },
  methods: {
    //这个函数是第一次动画结束的时候,第一次没有使用infinite,第一次动画执行完成后开始使用添加animate-infinite动画
    onAnimationEnd() {
      this.firstRound = false;
      //这是时候样式多出了padding-left:this.wrapWidth;所以要想速度一样需要重新计算时间
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
      this.animationClass = 'animate-infinite';
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 24px;
  overflow: hidden;
  position: relative;
  background: rgb(253, 252, 251);
  position: relative;
  padding: 0;
}

.wrap .content {
  position: absolute;
  white-space: nowrap;
}

.animate {
  animation: paomadeng linear;
}

.animate-infinite {
  animation: paomadeng-infinite linear infinite;
}

@keyframes paomadeng {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes paomadeng-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
