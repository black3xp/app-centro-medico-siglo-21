<template>
  <div class="covid">
    <div class="icon mt-5">
      <span class="material-icons">task_alt</span>
    </div>
    <h2 class="title text-center">SOLICITUD REALIZADA</h2>
    <p class="text-center">El numero de la solicitud es:</p>
    <p class="text-center" style="font-size: 20px"><strong>{{solicitud}}</strong></p>
    <p class="text-center">
      Tome una captura de pantalla o puede ver su solicitud en Mis Solicitudes.
    </p>
    <div class="d-grid mt-5 gap-2 col-6 mx-auto">
      <router-link to="/" class="btn btn-primary" type="button">Volver al inicio</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Covid',
  components: {
  },
  data() {
    return {
      numSolicitud: this.$store.state.numeroSolicitud || 'No se encuentra el numero de solicitud',
    };
  },
  methods: {
  },
  computed: {
    solicitud() {
      return this.$store.state.numeroSolicitud;
    },
  },
  mounted() {
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/style/global.less');
.icon{
  text-align: center;
  span{
    font-size: 60px;
    color: @siglo-color;
  }
}
</style>
