<template>
  <div v-bind="$attrs" class="d-flex flex-fill justify-center align-center fill-height" v-on="$listeners">
    <div class="errorpage">
      <Error class="error-frame" />
      <div class="content">
        <div class="subcontent">
          <div class="mb-3 span darken3--text font-robotoslab">{{ title }}</div>
          <div class="span darken3--text font-robotoslab">{{ subTitle }}</div>
          <dx-button color="primary" class="text-underline" :to="linkTarget"> {{ linkText }}</dx-button>
        </div>
      </div>
      <span class="link">
        <span>Si no funciona escríbenos en</span>
        <a href="https://digital.gob.cl/incidencia">https://digital.gob.cl/incidencia</a>
      </span>
    </div>
  </div>
</template>
<script>
import Error from '../../svg/components/Error/Error.svg'

export default {
  name: 'ErrorPage',
  components: {
    Error,
  },
  props: {
    color: String,
    linkTarget: {
      type: String,
      default: () => '/',
    },
    linkText: {
      type: String,
      default: () => 'Vuelve a intentarlo',
    },
    title: {
      type: String,
      default: () => 'Lo sentimos,',
    },
    subTitle: {
      type: String,
      default: () => 'hemos tenido un problema',
    },
    width: {
      type: Number,
      default: 201,
    },
    height: {
      type: Number,
      default: 40,
    },
  },
  mounted() {
    console.log(this.$router)
  },
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 800px) {
  .error-frame {
    position: relative;
  }

  .errorpage .content {
    top: -20rem !important;
    position: relative !important;
    right: auto !important;
    margin-left: 1rem !important;
  }

  .errorpage {
    height: 250px;
    position: relative;
    width: auto !important;

    .link {
      bottom: 3rem !important;
      left: 0 !important;
      width: 100%;
      margin-left: 1rem !important;
      span,
      a {
        text-align: center !important;
        display: block !important;
      }
    }
  }
}

.errorpage {
  width: 799px;
  position: relative;
}

.errorpage .content {
  text-align: center;
  top: 8rem;
  position: absolute;
  right: 12rem;
}

.errorpage .link {
  position: absolute;
  bottom: 6rem;
  left: 15rem;
}

.errorpage .content > div.subcontent {
  width: 316px;
  margin: 0 auto;
}

.errorpage .content .span {
  display: block;
  font-size: 25px;
  font-weight: 700;
  line-height: 32px;
}

.errorpage .content .v-btn {
  margin: 35px 0 30px;
}
</style>
