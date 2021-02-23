export default {
  props: {
    autoUpload: Boolean,
    headers: Object,
    withCredentials: Boolean,
    data: Object,
    limit: {
      type: Number,
      default: 100,
    },
  },
}
