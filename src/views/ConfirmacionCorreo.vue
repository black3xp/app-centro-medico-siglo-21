<template>
  <div class="covid">
    <div class="icon mt-5">
      <span class="material-icons text-warning">email</span>
    </div>
    <h2 class="title text-center">Revisa tu bandeja de email</h2>
    <p class="text-center">Se ha enviado un mensaje de confirmación a tu correo:</p>
    <p class="text-center" style="font-size: 20px"><strong>{{email}}</strong></p>
    <p class="text-center">
      Revisa tu bandeja de entrada y confirma tu registro. Si no encuentras
      el mensaje puedes revisar en <strong>spam.</strong>
    </p>
    <p class="text-success text-center">
      <strong>Si ya confirmaste tu correo puedes iniciar sesion.</strong>
    </p>
    <div class="d-grid mt-5 gap-2 col-6 mx-auto">
      <router-link to="/login" class="btn btn-primary" type="button">Iniciar sesión</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ConfirmacionCorreo',
  components: {
  },
  data() {
    return {
      correo: this.$route.params.correo,
    };
  },
  methods: {
  },
  computed: {
    email() {
      return this.correo;
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
  }
}
</style>
