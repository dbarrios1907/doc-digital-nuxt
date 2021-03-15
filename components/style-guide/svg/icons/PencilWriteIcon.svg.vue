<template>
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1213 3.39535C18.4625 3.06778 18.4625 2.53864 18.1213 2.21107L16.0737 0.245674C15.7325 -0.0818915 15.1813 -0.0818915 14.84 0.245674L13.125 1.8919L16.4062 5.04157L18.1213 3.39535ZM15.5312 5.88148L12.2499 2.7318L3.49994 11.1309V14.2806H6.78119L15.5312 5.88148ZM21 16.8004H0V20.16H21V16.8004Z" :fill="fill"/>
    </svg>
</template>

<script>
export default {
  name: 'PencilWriteIcon',
  props: {
    fill: {
        Type: String,
        default: 'white'
    },
  },
}
</script>
