<template>
  <div class="login">
    <h1 class="mt-2">Iniciar ses&iacute;on</h1>
    <p>Puedes iniciar ses&iacute;on, registrarte o<br/> hacer un solicitud sin registro.</p>
    <form autocomplete="off" class="form-login" @submit.prevent="login">
      <Input
      :tipo="'email'"
      :id="'inpUsuario'"
      :placeholder="'Usuario'"
      :requerido="true"
      :autocomplete="'username'"
      v-model="usuario"
    />
    <Input
      class="mt-4"
      :tipo="'password'"
      :id="'inpPassword'"
      :placeholder="'Contraseña'"
      :requerido="true"
      :autocomplete="'current-password'"
      v-model="password"
    />
      <transition
        name="fade"
        enter-active-class="fade"
        leave-active-class="fade"
      >
        <div class="cargador" v-show="cargando">
          <Cargador />
        </div>
      </transition>
      <transition
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
      >
        <div class="alert alert-danger mt-4" v-if="mensajeError" role="alert">
          {{mensajeError}}
        </div>
      </transition>
    <button
      type="submit"
      class="btn btn-success btn-vnc mt-2">Entrar</button>
    <button @click="irRegistro"
      type="button"
      class="btn btn-outline-success btn-vnc mt-3">Registrate</button>
    <img :src="logo" class="logo" alt="logo">
    </form>
  </div>
</template>

<script>
import Input from '@/components/InputComponent.vue';
import Cargador from '@/components/Cargador.vue';
// eslint-disable-next-line import/named
import { url } from '@/util/index';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
const logotipo = require('../assets/logo.svg');

export default {
  name: 'Login',
  components: {
    Input,
    Cargador,
  },
  data() {
    return {
      logo: logotipo,
      usuario: '',
      password: '',
      cargando: false,
      mensajeError: '',
    };
  },
  methods: {
    login() {
      this.cargando = true;
      this.mensajeError = '';
      const data = { username: this.usuario, password: this.password };
      const config = {
        method: 'post',
        url: `${url}/users/Autenticar`,
        headers: { },
        data,
      };

      axios(config)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem('auth', response.data.access_token);
            this.cargando = false;
            this.$router.push({ name: 'Home' });
          }
          this.mensajeError = 'Uuups, Ha ocurrido un error, intentalo de nuevo mas tarde';
        }).catch((error) => {
          this.cargando = false;
          if (error.response) {
            if (error.response.status === 403) {
              this.mensajeError = 'Usuario o contraseña';
            }
          } else {
            this.mensajeError = 'Uuups, Ha ocurrido un error, intentalo de nuevo mas tarde';
          }
        });
    },
    irRegistro() {
      this.$router.push('/registro');
    },
  },
};
</script>

<style lang="less" scoped>
.form-login{
  margin-top: 20px;
  .btn-vnc{
    height: 50px;
    width: 100%;
    border-radius: 15px;
  }
  .logo{
    width: 128px;
    display: block;
    margin: 30px auto;
  }
}
</style>
