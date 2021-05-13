<template>
  <div class="covid">
    <BarraSuperior :atras="'/'"/>
    <h2 class="title">Solicitud de {{detalleSolicitud.descripcion || 'No se encontro'}}</h2>
    <span
      class="badge bg-primary-vnc"
      style="font-size: 14px"
    >Solicitud No. {{solicitud.codigo}}</span>
    <span
      class="badge"
      :class="
        solicitud.estadoId === 'N' ? 'bg-primary'
        : solicitud.estadoId === 'X' ? 'bg-danger' : 'bg-success'"
      style="font-size: 14px; margin-left: 5px;"
    >{{solicitud.estado}}</span>
    <form>
      <br>
      <Input
        :name="'Name'"
        :tipo="'text'"
        :valor="fechaCreado"
        :label="'Fecha'"
        :readonly="'true'"
      />
      <Input
        :name="'Name'"
        :tipo="'text'"
        :valor="solicitud.modalidad"
        :label="'Modalidad'"
        :readonly="'true'"
      />
      <div class="alert alert-success mt-4" role="alert">
        <h6 class="alert-heading">Comentario</h6>
        {{solicitud.comentario}}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
        neque maiores. Ullam, beatae voluptates iusto quam nobis
        atque corrupti expedita, sit, perspiciatis minus facilis
        alias maxime quia hic itaque facere?
      </div>
    </form>
    <Menu/>
  </div>
</template>
<script>
import BarraSuperior from '@/components/BarraSuperior.vue';
import Menu from '@/components/Menu.vue';
import Input from '@/components/InputComponent.vue';
// import Select from '@/components/SelectComponent.vue';
import axios from 'axios';
// eslint-disable-next-line import/named
import { url, isLogin } from '@/util/index';

export default {
  name: 'MisSolicitudes',
  components: {
    BarraSuperior,
    Input,
    Menu,
  },
  data() {
    return {
      usuario: [],
      solicitud: {},
      detalleSolicitud: {},
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
      }).catch((err) => {
        console.log(err);
      });
    },
    cargarSolicitud() {
      const config = {
        method: 'get',
        url: `${url}/solicitudes/${this.$route.params.id}`,
      };
      axios(config).then((res) => {
        this.solicitud = res.data;
        console.log(this.solicitud);
      });
    },
    cargarDetalleSolicitud() {
      const config = {
        method: 'get',
        url: `${url}/solicitudes/${this.$route.params.id}/items`,
      };
      axios(config).then((res) => {
        const solicitud = res.data[0];
        const { servicio } = solicitud;
        this.detalleSolicitud = servicio;
      });
    },
  },
  computed: {
    fechaCreado() {
      return new Date(this.solicitud.createdAt).toLocaleString('es-DO');
    },
  },
  mounted() {
    this.cargarUsuario();
    this.cargarSolicitud();
    this.cargarDetalleSolicitud();
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/style/global.less');
.bg-primary-vnc{
  color: #0d6efd;
  border: #0d6efd 1px solid;
}
</style>
