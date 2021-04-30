<template>
  <div class="covid">
    <BarraNoAtras :atras="'/solicitud/nueva/ec197870-82e1-4215-9140-6b129f71c3e1'"/>
    <h2 class="title">Completa tus datos</h2>
    <form @submit.prevent="completarDatos">
      <Input
        :label="'Nombre'"
        :tipo="'text'"
        :id="'inpNombre'"
        :requerido="false"
        v-model="nombre"
      />
      <Input
        :label="'Apellidos'"
        :tipo="'text'"
        :id="'inpApellidos'"
        :requerido="false"
        v-model="apellidos"
      />
      <Input
        :label="'Apodo'"
        :tipo="'text'"
        :id="'inpApodo'"
        :requerido="false"
        v-model="apodo"
      />
      <Select
        :label="'Sexo'"
        :placeholder="'seleccionar sexo'"
        :requerido="true"
        :id="'sltSexo'"
        v-model="sexo"
      >
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </Select>
      <InputDate
        :label="'Fecha de nacimiento'"
        :tipo="'date'"
        :id="'inpTelefono'"
        :requerido="false"
        :fechaMaximo="new Date().toISOString().split('T')[0]"
        v-model="fechaDeNacimiento"
      />
      <Select
        :label="'Aseguradora'"
        :placeholder="'seleccionar aseguradora'"
        :requerido="true"
        :id="'sltAseguradora'"
        v-model="aseguradora"
      >
        <option
          v-for="(aseguradora, index) in aseguradoras"
          :key="index"
          :value="aseguradora.id">
            {{aseguradora.nombre}}
        </option>
      </Select>
      <Input
        :label="'Numero de seguro'"
        :tipo="'number'"
        :id="'inpNumSeguro'"
        :requerido="false"
        v-model="numeroSeguro"
      />
      <Input
        :label="'Cedula'"
        :tipo="'number'"
        :id="'inpCedula'"
        :requerido="false"
        v-model="cedula"
      />
      <Input
        :label="'Email'"
        :tipo="'email'"
        :id="'inpEmail'"
        :requerido="false"
        v-model="email"
      />
      <Input
        :label="'Celular'"
        :tipo="'tel'"
        :id="'inpCelular'"
        :requerido="false"
        v-model="celular"
      />
      <Input
        :label="'Telefono'"
        :tipo="'tel'"
        :id="'inpTelefono'"
        :requerido="false"
        v-model="telefono"
      />
      <Select
        :label="'Nacionalidad'"
        :placeholder="'seleccionar nacionalidad'"
        :requerido="true"
        :id="'sltNacionalidades'"
        v-model="nacionalidad"
      >
        <option
          v-for="(nacionalidad, index) in nacionalidades"
          :key="index"
          :value="nacionalidad.id">
            {{nacionalidad.nombre}}
        </option>
      </Select>
      <Select
        :label="'Provincia'"
        :placeholder="'seleccionar provincia'"
        :requerido="true"
        :id="'sltProvincia'"
        v-model="provincia"
      >
        <option
          v-for="(provincia, index) in provincias"
          :key="index"
          :value="provincia.id">
            {{provincia.nombre}}
        </option>
      </Select>
      <Select
        :label="'Municipio'"
        :placeholder="'seleccionar municipio'"
        :requerido="true"
        :id="'sltMunicipio'"
        v-model="municipio"
      >
        <option
          v-for="(municipio, index) in municipios"
          :key="index"
          :value="municipio.id">
            {{municipio.nombre}}
        </option>
      </Select>
      <Input
        :label="'Ciudad'"
        :tipo="'text'"
        :id="'inpCiudad'"
        :requerido="false"
        v-model="ciudad"
      />
      <div class="mb-3">
        <label class="form-label">Direccion</label>
        <textarea class="form-control" rows="3" v-model="direccion"></textarea>
      </div>
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
      <div class="row mt-4 mb-5">
        <div class="col-6">
          <div class="d-grid gap-2">
            <router-link to="/" class="btn btn-danger" type="button">Cancelar</router-link>
          </div>
        </div>
        <div class="col-6">
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="submit">Siguiente</button>
          </div>
        </div>
      </div>
      <br><br><br>
    </form>
    <Menu/>
  </div>
</template>
<script>
import BarraNoAtras from '@/components/BarraNoAtras.vue';
import Menu from '@/components/Menu.vue';
import Input from '@/components/InputComponent.vue';
import InputDate from '@/components/InputDate.vue';
import Select from '@/components/SelectComponent.vue';
import Cargador from '@/components/Cargador.vue';
// import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
// eslint-disable-next-line import/named
import { isLogin, url } from '@/util/index';

import moment from '../../node_modules/moment/moment';

export default {
  name: 'CompletarDatos',
  components: {
    Menu,
    BarraNoAtras,
    Input,
    Select,
    InputDate,
    Cargador,
  },
  data() {
    return {
      nacionalidades: [],
      nacionalidad: '',
      provincias: [],
      municipios: [],
      aseguradoras: [],
      nombre: '',
      apellidos: '',
      apodo: '',
      sexo: '',
      fechaDeNacimiento: '2021-04-12 00:00:00',
      aseguradora: '',
      numeroSeguro: '',
      cedula: '',
      email: '',
      celular: '',
      telefono: '',
      provincia: '',
      municipio: '',
      ciudad: '',
      direccion: '',
      mensajeError: '',
      cargando: false,
    };
  },
  methods: {
    refrescarToken() {
      const config = {
        methods: 'get',
        url: `${url}/users/refrescar-token`,
        headers: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((x) => {
        if (x.data.access_token) {
          localStorage.setItem('auth', x.data.access_token);
          this.$router.push('/');
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`Error token refresh ${err}`);
      });
    },
    completarDatos() {
      this.cargando = true;
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isLogin()}`,
      };
      const data = {
        Nombre: this.nombre,
        Apellidos: this.apellidos,
        Apodo: this.apodo,
        Sexo: this.sexo,
        FechaNacimiento: this.fechaDeNacimiento,
        AseguradoraId: this.aseguradora,
        noAfiliado: this.numeroSeguro,
        Cedula: this.cedula,
        Email: this.email,
        Celular: this.celular,
        Telefono: this.telefono,
        Nacionalidad: this.nacionalidad,
        ProvinciaId: this.provincia,
        MunicipioId: this.municipio,
        Ciudad: this.ciudad,
        Direccion: this.direccion,
      };
      axios.post(`${url}/pacientes`, data).then((res) => {
        this.cargando = false;
        if (res.status === 403) {
          this.mensajeError = 'No esta autorizado';
        }
        if (res.data) {
          this.refrescarToken();
          this.cargando = false;
        }
      }).catch((err) => {
        this.cargando = false;
        if (err.response.status === 403) {
          this.mensajeError = 'No estas autorizado';
        }
        // eslint-disable-next-line no-console
        console.log(err.response);
      });
    },
    obtenerFecha(e) {
      const fecha = moment(e.value);
      fecha.format('DD/MM/YYYY');
    },
    cargarNacionalidades() {
      const config = {
        methods: 'get',
        url: `${url}/nacionalidades`,
        header: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((res) => {
        this.nacionalidades = res.data;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    cargarProvincias() {
      const config = {
        methods: 'get',
        url: `${url}/provincias`,
        header: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((res) => {
        this.provincias = res.data;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    cargarMunicipios() {
      const config = {
        methods: 'get',
        url: `${url}/municipios`,
        header: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((res) => {
        this.municipios = res.data;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    cargarAseguradoras() {
      const config = {
        methods: 'get',
        url: `${url}/aseguradoras`,
        header: { Authorization: `Bearer ${isLogin()}` },
      };
      axios(config).then((res) => {
        this.aseguradoras = res.data;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
  },
  computed: {
    fechaNacimiento() {
      return new Date(this.fechaDeNacimiento).toISOString().split('T')[0];
    },
  },
  mounted() {
    this.cargarNacionalidades();
    this.cargarProvincias();
    this.cargarMunicipios();
    this.cargarAseguradoras();
  },
  updated() {
    if (!isLogin()) {
      this.$router.push('/login');
    }
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/style/global.less');
.cargador{
  height: 50px;
  width: 50px;
  margin: 0 auto;
}
</style>
