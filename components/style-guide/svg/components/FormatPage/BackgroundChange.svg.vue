<template>
    <dx-button v-bind="$attrs" v-on="$listeners" class="dx-button-icon" color="white">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12.4509V25.5491H25.5491V12.4509H19ZM16.1875 10.5625H27.4375V27.4375H16.1875H10.5625V10.5625H16.1875Z" fill="#656565"/>
            <rect x="0.75" y="0.75" width="36.5" height="36.5" stroke="#656565" stroke-width="1.5"/>
        </svg>
    </dx-button>
</template>
<script>
export default {
  name: 'BackgroundChange'
}
</script>
<style scoped>
.dx-button-icon.v-btn {
  min-width: auto;
  padding: 0;
}
</style>
