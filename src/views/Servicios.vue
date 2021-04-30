<template>
  <div class="covid">
    <pantalla-carga v-if="carga"/>
    <BarraSuperior :atras="'/'"/>
    <h2 class="title">Solicitud {{nombreServicio || 'No service'}}</h2>
    <div class="alert alert-danger" role="alert" v-if="servicio.flag === 'PRE'">
      <p>Agregue una foto por cada una de las recetas o indicaciones medicas</p>
    </div>
    <form @submit.prevent="enviarSolicitud">
      <Select
        v-if="servicio.flag === 'COV'"
        :label="'Tipo de seguro'"
        :placeholder="'categoria de afiliado'"
        :requerido="true"
        :id="'sltCategoriaAfiliado'"
        v-model="tipoDeSeguro"
      >
        <option value="Contributivo">Contributivo</option>
        <option value="Subsidiado">Subsidiado</option>
        <option value="Contributivo-Subsidiado">Contributivo-Subsidiado</option>
      </Select>
      <Select
        v-if="servicio.flag === 'COV'"
        :label="'Colectivo'"
        :placeholder="'grupo al que pertenece'"
        :requerido="true"
        :id="'sltColectivo'"
        v-model="tipoDeColectivo"
      >
        <option value="Centro Educativo">Centro Educativo</option>
        <option value="Centro Laboral">Centro Laboral</option>
        <option value="Hotel">Hotel</option>
        <option value="Cárcel">C&aacute;rcel</option>
        <option value="Recinto Militar">Recinto Militar</option>
        <option value="Hogar de Cuidado">Hogar de Cuidado</option>
        <option value="Albergue">Albergue</option>
        <option value="Centro de Salud">Centro de Salud</option>
        <option value="Comunidad">Comunidad</option>
      </Select>
      <Select
        v-if="servicio.flag === 'COV'"
        :label="'Motivo de solicitud'"
        :placeholder="'seleccionar motivo'"
        :requerido="true"
        :id="'sltMotivoSolicitud'"
        v-model="motivoDeSolicitud"
      >
        <option value="Por sintomas">Por sintomas</option>
        <option value="Embarazo">Embarazo</option>
        <option value="Por viajes">Por viajes</option>
        <option value="Por procesos quirúrgico">Por procesos quir&uacute;rgico</option>
        <option value="Por solicitud de trabajo">Por solicitud de trabajo</option>
      </Select>
      <Select
        :label="'Modalidad de solicitud'"
        :placeholder="'seleccione la modalidad'"
        :requerido="true"
        :id="'sltModalidadSoolicitud'"
        v-model="modalidadSolicitud"
      >
        <option value="Normal">Normal</option>
        <option value="Automovil">Automovil</option>
      </Select>
      <Input
        :label="'Nombre'"
        :tipo="'text'"
        :id="'inpNombre'"
        :requerido="false"
        v-if="!covid"
      />
      <div class="sintomas" v-if="servicio.flag !== 'PRE'">
        <p><strong>Síntomas</strong></p>
        <hr/>
        <div class="form-check" style="border: 1px solid #1D7B34;">
          <div class="checker">
            <input class="form-check-input"
              type="checkbox"
              value=""
              id="chkNinguno"
              @input="chkNinguno = !chkNinguno"
              @change="() => agregarSintoma('Ninguno')"
            >
            <label class="form-check-label" for="chkNinguno">
                  Ninguno
            </label>
          </div>
        </div>
        <div class="chk" v-if="!chkNinguno">
          <div  class="form-check" v-for="(item, index) in sintomas" v-bind:key="index">
            <div class="checker">
              <input class="form-check-input"
                type="checkbox"
                value=""
                :id="item.id"
                v-model="item.check"
                v-on:change="() => agregarSintoma(item.nombre)"
              >
              <label class="form-check-label" :for="item.id">
                    {{item.nombre}}
              </label>
            </div>
        </div>
        </div>
      </div>
      <!--subir imagenes componente-->
      <div class="imagenes">
        <div class="row">
          <div class="col-12">
            <div class="row justify-content-center">
              <div class="contenedor-img col-4"
              v-for="(imagen, index) in imagenesPreview" :key="index">
              <button type="button" @click="eliminarImagen(imagen)" class="btn-eliminar">
                <span class="material-icons">close</span>
              </button>
              <img :src="convertirImagenBlog(imagen)" class="preview">
            </div>
            <label for="subirImagen" class="btn-subir-imagen col-4">
              <span class="material-icons">add_a_photo</span>
              <span class="texto-subir">foto receta</span>
            </label><br>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            id="subirImagen"
            @input="agregarImagenes"
          >
        </div>
      </div>
      <transition
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
      >
        <div class="alert alert-danger mt-4" v-if="mensajeError" role="alert">
          {{mensajeError}}
        </div>
      </transition>
      <div class="cargador" v-show="cargando">
          <Cargador />
      </div>
      <!--.subir imagenes componente-->
      <div class="row mt-4 mb-5">
        <div class="col-6">
          <div class="d-grid gap-2">
            <router-link to="/" class="btn btn-danger" type="button">Cancelar</router-link>
          </div>
        </div>
        <div class="col-6">
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="submit">Solicitar</button>
          </div>
        </div>
      </div>
    </form><br><br><br>
    <Menu/>
  </div>
</template>
<script>
import BarraSuperior from '@/components/BarraSuperior.vue';
import Menu from '@/components/Menu.vue';
import Input from '@/components/InputComponent.vue';
import Cargador from '@/components/Cargador.vue';
import PantallaCarga from '@/components/PantallaCarga.vue';
import Select from '@/components/SelectComponent.vue';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// eslint-disable-next-line import/named
import { url, isLogin } from '@/util/index';

export default {
  name: 'Solicitudes',
  components: {
    BarraSuperior,
    Menu,
    Input,
    Select,
    Cargador,
    PantallaCarga,
  },
  data() {
    return {
      id: '',
      covid: true,
      chkNinguno: false,
      imagenes: this.$store.state.fotosCovid,
      mensajeError: '',
      servicio: {},
      nombreServicio: '',
      modalidadSolicitud: '',
      tipoDeSeguro: this.$store.state.tipoSeguro,
      tipoDeColectivo: this.$store.state.colectivo,
      motivoDeSolicitud: this.$store.state.motivoSolicitud,
      todosSintomas: this.$store.state.sintomas,
      sinSintomas: false,
      datosPaciente: [],
      cargando: false,
      carga: true,
    };
  },
  methods: {
    cargarServicios() {
      const config = {
        method: 'get',
        url: `${url}/Servicios`,
        headers: {},
      };
      axios(config).then((res) => {
        const servicio = res.data.filter((x) => x.id === this.$route.params.id);
        if (servicio.length === 0) {
          this.$router.push('/');
        }
        // eslint-disable-next-line prefer-destructuring
        this.servicio = servicio[0];
        this.nombreServicio = this.servicio.descripcion;
        this.carga = false;
      }).catch((error) => {
        this.carga = false;
        // eslint-disable-next-line no-console
        console.log(error);
      });
    },
    enviarSolicitud() {
      this.cargando = true;
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isLogin()}`,
      };
      const usuario = jwtDecode(isLogin());
      axios.get(`${url}/Pacientes/${usuario.patient_id}`).then((res) => {
        this.datosPaciente = res.data;
        // eslint-disable-next-line no-restricted-syntax
        const sintomas = this.todosSintomas.some((x) => x.check);
        if (this.servicio.flag === 'PRE') {
          if (this.imagenes.length === 0) {
            this.mensajeError = 'Debe subir al menos una foto de la receta medica';
          } else {
            this.cargando = false;
            this.solicitudServicio(usuario);
            this.$router.push('/solicitud/completa');
          }
        } else if (this.servicio.flag === 'COV') {
          if (!sintomas && !this.chkNinguno) {
            this.mensajeError = 'No ha seleccionado ningun sintoma, en caso de no tenerlo seleccione ninguno';
          } else if (this.imagenes.length === 0) {
            this.mensajeError = 'Debe subir al menos una foto de la receta medica';
          } else {
            this.cargando = false;
            this.solicitudServicio(usuario);
            this.$router.push('/solicitud/completa');
          }
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    solicitudServicio(usuario) {
      this.cargando = true;
      let sintomasSeparados = '';
      this.todosSintomas.forEach((item) => {
        if (item.check === true) {
          sintomasSeparados += `${item.nombre}, `;
        }
      });
      const data = {
        PacienteId: usuario.patient_id,
        AseguradoraId: this.datosPaciente.aseguradoraId,
        Colectivo: this.tipoDeColectivo,
        MotivoSolicitud: this.motivoDeSolicitud,
        Comentario: sintomasSeparados,
        NumeroAsegurado: this.datosPaciente.noAfiliado,
        Modalidad: this.modalidadSolicitud,
        CategoriaAfiliado: this.tipoDeSeguro,
        fotosCovid: this.imagenes,
        Items: [{ servicioId: this.servicio.id }],
      };
      const config = {
        method: 'post',
        url: `${url}/Solicitudes/`,
        data,
      };
      this.estadosSolicitudCovid(data);
      // ============ Se esta creando la nueva solicitud ==========
      // eslint-disable-next-line no-shadow
      axios(config).then((res) => {
        const datos = {
          tipoSeguro: '',
          colectivo: '',
          motivoSolicitud: '',
          fotosCovid: [],
          servicio: '',
        };
        this.cargando = false;
        // eslint-disable-next-line no-console
        console.log(res.data);
        this.actualizarNumeroSolicitud(res.data.codigo);
        this.cargarFotosReceta(res.data.id);
        this.estadosSolicitudCovid(datos);
      }).catch((err) => {
        this.cargando = false;
        // eslint-disable-next-line no-console
        console.log(err);
      });
      this.mensajeError = '';
    },
    cargarFotosReceta(idSolicitud) {
      this.cargando = true;
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${isLogin()}`,
      };
      const data = new FormData();
      this.imagenes.forEach((item) => {
        data.append('files', item);
      });
      const config = {
        method: 'post',
        url: `${url}/Solicitudes/${idSolicitud}/agregar-archivos`,
        data,
      };
      axios(config).then((res) => {
        this.cargando = false;
        if (res.status === 200) {
          // eslint-disable-next-line no-console
          console.log('todo listo');
        }
      }).catch((err) => {
        this.cargando = false;
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    agregarSintoma() {
      this.asignarSintomas(this.todosSintomas);
    },
    eliminarImagen(img) {
      const imagen = this.imagenes.indexOf(img);
      this.imagenes.splice(imagen, 1);
    },
    agregarImagenes(event) {
      const archivos = event.target.files;
      this.imagenes = [...this.imagenes, ...archivos];
    },
    ...mapMutations([
      'estadosSolicitudCovid',
      'asignarSintomas',
      'actualizarNumeroSolicitud',
    ]),
    cargarImagenes() {
      const { imagenes } = this;
      return imagenes;
    },
    convertirImagenBlog(imagen) {
      return URL.createObjectURL(imagen);
    },
  },
  computed: {
    ...mapState([
      'tipoSeguro',
      'colectivo',
      'motivoSolicitud',
      'allSintomas',
      'fotosCovid',
      'sintomas',
      'numeroSolicitud',
    ]),
    imagenesPreview() {
      return this.cargarImagenes();
    },
    tituloServicio() {
      return this.servicio;
    },
    sintomasCargados() {
      return this.allSintomas;
    },
  },
  beforeCreate() {
  },
  mounted() {
    this.cargarServicios();
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/style/global.less');
.covid{
  .btn-subir-imagen{
    color: @texto-serv;
    border-radius: 10px;
    border: 4px dashed @texto-serv;
    height: 80px;
    text-align: center;
    padding-top: 10px;
    span{
      display: block;
      margin-top: 3px;
    }
    .texto-subir{
      display: block;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
  .contenedor-img{
    position: relative;
    .btn-eliminar{
      display: flex;
      background-color: red;
      border: 3px solid white;
      border-radius: 5px;
      color: white;
      font-size: 3px;
      position: absolute;
      right: 0;
      top: -10px;
    }
  }
}
.form-check label{
  font-size: 17px;
  width: 100%;
}
.form-check{
  margin-bottom: 10px;
  background-color: @card-background-serv;
  border-radius: 10px;
}
.checker{
  padding: 10px;
}
.imagenes{
  padding-top: 20px;
}
.preview{
  max-width: 100%;
  width: 100%;
  height: 80px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 10px;
}
input[type=file]{
  max-width: 100%;
  display: none;
}
</style>
