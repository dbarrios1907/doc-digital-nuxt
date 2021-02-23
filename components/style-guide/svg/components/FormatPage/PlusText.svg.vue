<template>
    <dx-button v-bind="$attrs" v-on="$listeners" class="dx-button-icon" color="white">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3532 18.3682V20.1929H12.423V18.3682H10.5625V17.4559H12.423V15.6312H13.3532V17.4559H15.2137V18.3682H13.3532ZM14.7831 24.0998L15.7642 23.9661L20.3881 12.25H21.9233L26.4655 23.9661L27.4375 24.0998V25.2224H23.6403V24.0998L24.6395 23.9305L23.7674 21.5427H18.4713L17.5719 23.9305L18.5712 24.0998V25.2224H14.7831V24.0998ZM19.0254 20.0726H23.2224L21.1693 14.5041H21.1148L19.0254 20.0726Z" fill="#656565"/>
            <rect x="0.885" y="0.885" width="36.23" height="36.23" stroke="#656565" stroke-width="1.77"/>
        </svg>
    </dx-button>
</template>
<script>
export default {
  name: 'PlusText'
}
</script>
<style scoped>
  .dx-button-icon.v-btn {
      min-width: auto;
      padding: 0;
  }
</style>
