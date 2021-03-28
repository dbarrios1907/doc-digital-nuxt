<template>
    <svg width="20" height="20" v-bind="$props" v-on="$listeners" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM3 12L7 16L15 8L13.59 6.58L7 13.17L4.41 10.59L3 12Z" :fill="fill"/>
    </svg>
</template>

<script>
export default {
  name: 'VisarIcon',
  props: {
    fill: {
        Type: String,
        default: '#373737'
    },
  },
}
</script>



