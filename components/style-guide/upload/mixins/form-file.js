import Vue from '@/shared/utils/vue'
import identity from '@/shared/utils/identity'
import { isArray, concat } from '@/shared/utils/array'
import { isFile, isFunction, isUndefinedOrNull } from '@/shared/utils/inspect'
import { File } from '@/shared/utils/safe-types'
import { toString } from '@/shared/utils/string'
import { warn } from '@/shared/utils/warn'

const NAME = 'FormFile'

const VALUE_EMPTY_DEPRECATED_MSG = 'Setting "value"/"v-model" to an empty string for reset is deprecated. Set to "null" instead.'

// @vue/component
export default /*#__PURE__*/ Vue.extend({
  name: NAME,
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    limit: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [File, Array],
      default: null,
      validator: val => {
        /* istanbul ignore next */
        if (val === '') {
          warn(VALUE_EMPTY_DEPRECATED_MSG, NAME)
          return true
        }
        return isUndefinedOrNull(val) || isFile(val) || (isArray(val) && (val.length === 0 || val.every(isFile)))
      },
    },
    accept: {
      type: String,
      default: '',
    },
    // Instruct input to capture from camera
    capture: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: () => 'placeholder',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    directory: {
      type: Boolean,
      default: false,
    },
    noTraverse: {
      type: Boolean,
      default: false,
    },
    noDrop: {
      type: Boolean,
      default: false,
    },
    fileNameFormatter: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      selectedFile: null,
      stackedFiles: [],
      dragging: false,
      hasFocus: false,
    }
  },
  computed: {
    _id() {
      return this.safeId()
    },
    selectLabel() {
      // Draging active
      if (this.dragging && this.dropPlaceholder) {
        return this.dropPlaceholder
      }

      // No file chosen
      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder
      }

      // Convert selectedFile to an array (if not already one)
      const files = concat(this.selectedFile).filter(identity)

      if (this.hasNormalizedSlot('file-name')) {
        // There is a slot for formatting the files/names
        return [
          this.normalizeSlot('file-name', {
            files,
            names: files.map(f => f.name),
          }),
        ]
      } else {
        // Use the user supplied formatter, or the built in one.
        return isFunction(this.fileNameFormatter) ? toString(this.fileNameFormatter(files)) : files.map(file => file.name).join(', ')
      }
    },
  },
  watch: {
    selectedFile(newVal, oldVal) {
      // The following test is needed when the file input is "reset" or the
      // exact same file(s) are selected to prevent an infinite loop.
      // When in `multiple` mode we need to check for two empty arrays or
      // two arrays with identical files
      if (newVal === oldVal || (isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length && newVal.every((v, i) => v === oldVal[i]))) {
        return
      }
      if (!newVal && this.multiple) {
        this.$emit('input', [])
      } else {
        this.$emit('input', newVal)
      }
    },
    value(newVal) {
      if (!newVal || (isArray(newVal) && newVal.length === 0)) {
        this.reset()
      }
    },
  },
  methods: {
    focusHandler(evt) {
      // Bootstrap v4 doesn't have focus styling for custom file input
      // Firefox has a '[type=file]:focus ~ sibling' selector issue,
      // so we add a 'focus' class to get around these bugs
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true
      }
    },
    reset() {
      try {
        // Wrapped in try in case IE 11 craps out
        this.$refs.input.value = ''
        // eslint-disable-next-line no-empty
      } catch (e) {}
      // IE 11 doesn't support setting `input.value` to '' or null
      // So we use this little extra hack to reset the value, just in case.
      // This also appears to work on modern browsers as well.
      this.$refs.input.type = ''
      this.$refs.input.type = 'file'
      this.selectedFile = this.multiple ? [] : null
    },
    async onFileChange(evt) {
      // Always emit original event
      this.$emit('change', evt)
      // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse
      const items = evt.dataTransfer && evt.dataTransfer.items
      /* istanbul ignore next: not supported in JSDOM */
      if (items && !this.noTraverse) {
        const queue = []
        for (let i = 0; i < items.length; i++) {
          const item = items[i].webkitGetAsEntry()
          if (item) {
            queue.push(this.traverseFileTree(item))
          }
        }

        Promise.all(queue).then(filesArr => {
          this.setFiles(Array.from(filesArr))
        })

        return
      }
      // Normal handling
      this.setFiles(evt.target.files || evt.dataTransfer.files)
    },
    setFiles(files = []) {
      if (!files) {
        /* istanbul ignore next: this will probably not happen */
        this.selectedFile = null
      } else if (this.multiple) {
        // Convert files to array
        const filesArray = []
        for (let i = 0; i < files.length; i++) {
          filesArray.push(files[i])
        }
        // Return file(s) as array
        this.selectedFile = filesArray
      } else if (files && files.length > 0) {
        // Return single file object
        this.selectedFile = files[0] || null
      }
    },
    onReset() {
      // Triggered when the parent form (if any) is reset
      this.selectedFile = this.multiple ? [] : null
    },
    onDragover(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.noDrop || !this.custom) {
        return
      }
      this.dragging = true
      evt.dataTransfer.dropEffect = 'copy'
    },
    onDragleave(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      evt.preventDefault()
      evt.stopPropagation()
      this.dragging = false
    },
    onDrop(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.noDrop) {
        return
      }
      this.dragging = false
      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.onFileChange(evt)
      }
    },
    traverseFileTree(item, path) /* istanbul ignore next: not supported in JSDOM */ {
      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(resolve => {
        path = path || ''
        if (item.isFile) {
          // Get file
          item.file(file => {
            file.$path = path // Inject $path to file obj
            resolve(file)
          })
        } else if (item.isDirectory) {
          // Get folder contents
          item.createReader().readEntries(entries => {
            const queue = []
            for (let i = 0; i < entries.length; i++) {
              queue.push(this.traverseFileTree(entries[i], path + item.name + '/'))
            }
            Promise.all(queue).then(filesArr => {
              resolve(Array.from(filesArr))
            })
          })
        }
      })
    },
  },
})
