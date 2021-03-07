<template>
  <div v-bind="$attrs" class="errorpage" v-on="$listeners">
    <Error />
    <div class="content">
      <div class="subcontent">
        <div class="mb-3 span darken3--text font-robotoslab">Lo sentimos,</div>
        <div class="span darken3--text font-robotoslab">No tiene permisos suficientes</div>
        <dx-button color="primary" class="text-underline" :to="$auth.options.redirect.login"> Desea loguerase ?</dx-button>
      </div>
      <span class="link">Si no funciona escríbenos en <a href="https://digital.gob.cl/incidencia">https://digital.gob.cl/incidencia</a> </span>
    </div>
  </div>
</template>
<script>
import Error from '../../svg/components/Error/Error.svg'
export default {
  name: 'ForbiddenAccess',
  components: {
    Error,
  },
  props: {
    color: String,

    width: {
      type: Number,
      default: 201,
    },
    height: {
      type: Number,
      default: 40,
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .errorpage {
    width: auto;
  }
  .errorpage .content {
    top: 6rem !important;
    left: 0 !important;
    right: 50% !important;
  }

  .errorpage .subcontent {
    margin-bottom: 130px !important;
  }
  .errorpage .content .v-btn {
    min-width: 100%;
  }

  .errorpage .link {
    bottom: 20px;
    width: 226px;
    position: relative;
    left: 45px;
  }
}
.errorpage {
  position: relative;
  margin: auto;
  width: 799px;
}

.errorpage .content {
  position: absolute;
  text-align: center;
  top: 8rem;
  right: 7rem;
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
