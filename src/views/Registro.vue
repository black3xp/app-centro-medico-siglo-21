<template>
  <div class="registro">
    <header>
      <h1>Registrate</h1>
      <p>Completa los campos del formulario<br/>
        para completar tu registro.</p>
    </header>
    <div class="contenedor pt-4">
      <form autocomplete="off" @submit.prevent="crearUsuario">
        <Input
          :placeholder="'Nombre completo'"
          :name="'Name'"
          :tipo="'text'"
          v-model="nombre"
          :requerido="true"
        />
        <Input
          :placeholder="'Telefono'"
          :name="'PhoneNumber'"
          :tipo="'tel'"
          v-model="telefono"
          :requerido="true"
        />
        <p class="mt-5"><strong>Datos de usuario</strong></p>
        <Input
          :placeholder="'Correo electronico'"
          :name="'Email'"
          :tipo="'email'"
          :autocomplete="'username'"
          v-model="correo"
          :requerido="true"
        />
        <Input
          :placeholder="'Contraseña'"
          :name="'PasswordHash'"
          :tipo="'password'"
          v-model="password"
          :autocomplete="'new-password'"
          :requerido="true"
        />
        <Input
          :placeholder="'Repetir contraseña'"
          :tipo="'password'"
          :autocomplete="'current-password'"
          v-model="passwordRepeat"
        />
        <transition
          name="bounce"
          enter-active-class="bounceInLeft"
          leave-active-class="bounceOutRight"
        >
          <div class="alert alert-danger mt-4" v-if="mensajeError" role="alert">
            {{mensajeError}}
          </div>
        </transition>
      <transition
        name="fade"
        enter-active-class="fade"
        leave-active-class="fade"
      >
        <div class="cargador" v-show="cargando">
          <Cargador />
        </div>
      </transition>
        <div class="d-grid">
          <button
            type="submit"
            class="btn btn-success btn-vnc mt-2">Registrarme
          </button>
          <router-link
            to="/login"
            class="btn btn-danger btn-vnc mt-2">Cancelar
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Input from '@/components/InputComponent.vue';
import Cargador from '@/components/Cargador.vue';
import axios from 'axios';
import { url } from '@/util/index';

require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'Home',
  components: {
    Input,
    Cargador,
  },
  data() {
    return {
      nombre: '',
      telefono: '',
      correo: '',
      password: '',
      passwordRepeat: '',
      mensajeError: '',
      cargando: false,
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    crearUsuario() {
      this.cargando = true;
      this.mensajeError = '';
      if (this.password !== this.passwordRepeat) {
        this.cargando = false;
        // eslint-disable-next-line no-return-assign
        return this.mensajeError = 'Las contraseñas no coinciden';
      }
      const data = {
        Name: this.nombre,
        PhoneNumber: this.telefono,
        Email: this.correo,
        PasswordHash: this.password,
      };
      const config = {
        method: 'post',
        url: `${url}/users/autoregistro`,
        headers: { },
        data,
      };

      axios(config)
        .then((res) => {
          if (res.data) {
            this.cargando = false;
            this.$router.push(`/confirmacion/correo/${this.correo}`);
          }
          // eslint-disable-next-line no-console
          console.log(res.data);
        }).catch((error) => {
          this.cargando = false;
          this.mensajeError = 'Ups, ocurrio un error en el servidor, intentalo de nuevo mas tarde';
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
@import url('../assets/style/global.less');
header{
  background-color: @siglo-color;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 100%;
  padding: 15px;
}
.contenedor{
  padding: 15px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 120px;
  width: 100%;
  min-height: 85vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
