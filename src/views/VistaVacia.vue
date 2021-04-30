<template>
  <div class="covid">
    <BarraSuperior :atras="'/solicitud/nueva/ec197870-82e1-4215-9140-6b129f71c3e1'"/>
    <h2 class="title">Resumen Servicio</h2>
    <form>
      <h1></h1>
    </form>
    <Menu/>
  </div>
</template>
<script>
import BarraSuperior from '@/components/BarraSuperior.vue';
import Menu from '@/components/Menu.vue';
// import Input from '@/components/InputComponent.vue';
// import Select from '@/components/SelectComponent.vue';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
// eslint-disable-next-line import/named
import { url, isLogin } from '@/util/index';

export default {
  name: 'Covid',
  components: {
    BarraSuperior,
    Menu,
  },
  data() {
    return {
      usuario: [],
    };
  },
  methods: {
    cargarUsuario() {
      const config = {
        methods: 'get',
        url: `${url}/users/cb3ef565-8a7d-4369-9f6a-079de6173830`,
        headers: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((res) => {
        this.usuario = res.data;
        console.log(this.usuario);
      }).catch((err) => {
        console.log(err);
      });
    },
    ...mapMutations([
      'estadosSolicitudCovid',
    ]),
  },
  computed: {
    ...mapState([
      'tipoSeguro',
      'colectivo',
      'motivoSolicitud',
      'allSintomas',
      'fotosCovid',
    ]),
  },
  mounted() {
    this.cargarUsuario();
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/style/global.less');

</style>
