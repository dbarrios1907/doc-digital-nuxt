import Vue from 'vue'
import Toast from './Toast.vue'

const MessageConstructor = Vue.extend(Toast)

let instance
const instances = []
let seed = 1


const Message = function (options) {
  const notifContainerEl = document.querySelector('.dx-notification-container');
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  const userOnClose = options.onClose
  const id = 'message_' + seed++

  options.onClose = function () {
    Message.close(id, userOnClose)
  }

  instance = new MessageConstructor({
    data: options,
  })
  instance.id = id

  instance.$mount()

  notifContainerEl.appendChild(instance.$el)
  let verticalOffset = options.offset || 20
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instance.visible = true
  instances.push(instance)
  return instance
}

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

Message.close = function (id, userOnClose) {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

Message.success = options => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  options.type = 'success'
  return Message(options)
}

Message.warning = options => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  options.type = 'warning'
  return Message(options)
}

Message.error = options => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  options.type = 'error'
  return Message(options)
}

Message.info = options => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  options.type = 'info'
  return Message(options)
}

export default Message
