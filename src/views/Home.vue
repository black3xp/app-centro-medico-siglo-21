<template>
  <div class="home">
    <BarraNoAtras/>
    <h1>Hola <span>{{nombreUser}}!</span></h1>
      <div class="servicios" >
        <p class="sub-title"><strong>Servicios</strong></p>
          <div class="row">
            <Servicios v-for="(servicio, index) in servicios"
              v-bind:key="index"
              v-bind:nombre="servicio.nombre"
              v-bind:icono="servicio.icon"
              v-bind:url="servicio.url"
            />
          </div>
      </div>
      <div class="otros-servicios">
        <p class="sub-title"><strong>Solicitudes</strong></p>
        <div class="solicitudes">
          <Solicitudes
            :nombre="'Preautorizar estudios'"
            :icon="require('@/assets/images/icons/preautoriza.jpg')"
            :url="'/solicitud/nueva/d94fb9bb-a2a4-11eb-b20b-f23c925c211b'"
          />
        </div>
      </div>
      <p class="sub-title"><strong>Mis solicitudes</strong></p>
      <mis-solicitudes
        v-for="(item, index) in misSolicitudes"
        :key="index"
        :codigo="item.codigo"
        :fecha="item.createdAt"
        :id="item.id"
        :estado="item.estadoId"
      /><br><br><br><br>
    </div>
    <Menu />
</template>

<script>
import '@/assets/style/global.less';
import Servicios from '@/components/Servicios.vue';
import Menu from '@/components/Menu.vue';
import BarraNoAtras from '@/components/BarraNoAtras.vue';
import Solicitudes from '@/components/Solicitudes.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { url, isLogin } from '@/util/index';
import MisSolicitudes from '@/components/MisSolicitudes.vue';

// eslint-disable-next-line import/no-unresolved
const imgCovid = require('@/assets/images/icons/virus.svg');
require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'Home',
  components: {
    Servicios,
    Menu,
    BarraNoAtras,
    Solicitudes,
    MisSolicitudes,
  },
  data() {
    return {
      show: false,
      nombreUser: '',
      misSolicitudes: [],
      servicios: [
        // eslint-disable-next-line global-require
        { nombre: 'Covid 19', icon: imgCovid, url: '/solicitud/nueva/ec197870-82e1-4215-9140-6b129f71c3e1' }],
      solicitudes: [
        // eslint-disable-next-line global-require
        { nombre: 'Covid 19', icon: imgCovid, url: '/solicitud/nueva/ec197870-82e1-4215-9140-6b129f71c3e1' }],
    };
  },
  methods: {
    cargarMisSolicitudes() {
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${isLogin()}`,
      };
      const config = {
        method: 'get',
        url: `${url}/solicitudes`,
      };
      axios(config).then((res) => {
        const { data } = res;
        const solicitudes = data;
        this.misSolicitudes = solicitudes.slice(solicitudes.length - 5);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    datosUsuario() {
      const token = localStorage.getItem('auth');
      let usuario = '';
      if (token) {
        // eslint-disable-next-line no-const-assign
        usuario = jwt_decode(token);
      }
      const nombre = usuario.display_name.split(' ')[0];
      this.nombreUser = nombre;
    },
  },
  mounted() {
    this.datosUsuario();
    this.cargarMisSolicitudes();
  },
};
</script>

<style lang="less" scoped>
@import url('../assets/style/global.less');
.home{
  height: 100%;
  .sub-title{
    font-size: 16px;
    margin-top: 20px;
  }
  .solicitudes{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
.servicios{
  margin-top: 20px;
}
h1{
  font-weight: 300;
  font-size: 25px;
  padding-bottom: 15px;
  span{
    font-weight: 400;
  }
}
</style>
