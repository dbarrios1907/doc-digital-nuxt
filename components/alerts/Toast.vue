<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <alert
      v-if="visible"
      class="dx-toast"
      v-bind="$data"
      :style="positionStyle"
      @onDismiss="close"
      @mouseenter.native="clearTimer"
      @mouseleave.native="startTimer"
    >
      {{ message }}
    </alert>
  </transition>
</template>

<script>
import { idMixin } from '~/shared/mixins/id'
import Alert from './Alert'

export default {
  name: 'DxToast',
  components: {
    Alert,
  },
  mixins: [idMixin],
  data() {
    return {
      visible: false,
      closed: false,
      message: '',
      duration: 4000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
    }
  },

  computed: {
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      }
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    },
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer() {
      console.log('CLEAR TIMER')
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        if (!this.closed) {
          this.close()
        }
      }
    },
  },
}
</script>

<style>
.dx-toast {
  position: fixed;
  z-index: 200;
  width: auto;
  right: 0;
  overflow: hidden;
  transition: top 0.6s ease;
}

.fade-enter-active {
  transition: opacity 0.3s, transform 0.4s;
}

.fade-leave-active {
  transition: opacity 0.3s, transform 0.4s 0.5s, top 0.4s;
  transition-timing-function: linear;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
