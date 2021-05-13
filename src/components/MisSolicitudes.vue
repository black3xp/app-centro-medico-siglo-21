<template>
    <div >
      <router-link
        :to="{ name: 'MisSolicitudes', params: { id: id }}"
      >
        <div class="mis-solicitudes">
          <div class="texto">
            <p class="texto-solicitudes">
              <strong>
                {{codigo}} <span class="badge bg-success">{{fechaSolicitud}}</span>
              </strong>
            </p>
            <small>
              <span
                :class="estado === 'N' ? 'circulo-verde' : 'circulo-rojo'"
              ></span>
              {{estado === 'N' ? 'Nuevo' : estado === 'X' ? 'Fallido' : 'En proceso'}}
            </small>
          </div>
          <div class="icono">
            <span class="material-icons">login</span>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
export default {
  name: '',
  props: ['fecha', 'codigo', 'id', 'estado'],
  methods: {
  },
  computed: {
    fechaSolicitud() {
      return new Date(this.fecha).toLocaleString('es-DO');
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
  .mis-solicitudes{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 3px solid @card-background-serv;
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
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
    .texto-solicitudes{
      padding-bottom: 5px;
    }
  }
</style>
