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
      <router-link :to="'/'">
        <div class="mis-solicitudes">
          <div class="texto">
            <p><strong>Preatuorizaciones de estudios</strong></p>
            <small>
              <span class="circulo-verde"></span>
              Todo esta listo
            </small>
          </div>
          <div class="icono">
            <span class="material-icons">login</span>
          </div>
        </div>
      </router-link>
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
  },
  data() {
    return {
      show: false,
      nombreUser: '',
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
        console.log(res.data);
      }).catch((err) => {
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
  a:hover{
    text-decoration: none;
  }
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
  .mis-solicitudes{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 3px solid @card-background-serv;
    padding: 10px;
    border-radius: 15px;
    .icono{
      color: @siglo-color;
    }
    .texto{
      position: relative;
      color: @siglo-color;
      p{
        margin: 0;
      }
    }
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
.circulo-verde::after{
  background-color: yellowgreen;
  height: 10px;
  width: 10px;
  content: ' ';
  position: absolute;
  left: 0;
  display: flex;
  margin-top: 6px;
  border-radius: 50%;
}
.circulo-verde{
  padding-left: 15px;
}
.circulo-rojo::after{
  background-color: red;
  height: 10px;
  width: 10px;
  content: ' ';
  position: absolute;
  left: 0;
  display: flex;
  margin-top: 6px;
  border-radius: 50%;
}
.circulo-rojo{
  padding-left: 15px;
}
</style>
