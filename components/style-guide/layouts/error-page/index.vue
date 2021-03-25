<template>
  <div v-bind="$attrs" class="d-flex flex-fill justify-center align-center fill-height" v-on="$listeners">
    <div :class="_rootClasses">
      <Error class="error-frame" />
      <div class="content">
        <div class="subcontent">
          <div class="mb-3 span darken3--text font-robotoslab">{{ title }}</div>
          <div class="subtitle span darken3--text font-robotoslab d-flex align-end justify-center">{{ subTitle }}</div>
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
      default: () => '/ingreso',
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
  computed: {
    _rootClasses() {
      let base = 'dx-error-page'
      if (this.title === '') {
        base += ' no-title'
      }

      return base
    },
  },
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 800px) {
  .error-frame {
    position: relative;
  }

  .dx-error-page .content {
    top: -20rem !important;
    position: relative !important;
    right: auto !important;
    margin-left: 1rem !important;
  }

  .dx-error-page {
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

.dx-error-page {
  width: 799px;
  position: relative;
}

.dx-error-page .content {
  text-align: center;
  top: 8rem;
  position: absolute;
  right: 12rem;
}

.dx-error-page .link {
  position: absolute;
  bottom: 6rem;
  left: 15rem;
}

.dx-error-page .content > div.subcontent {
  width: 316px;
  margin: 0 auto;
}

.dx-error-page .content .span {
  display: block;
  font-size: 25px;
  font-weight: 700;
  line-height: 32px;
}

.dx-error-page .content .v-btn {
  margin: 35px 0 30px;
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .dx-error-page.no-title .content > div.subcontent {
    position: relative;
    top: -50px;
  }

  .dx-error-page.no-title .content > div.subcontent .subtitle {
    height: 95px;
  }
}
</style>
