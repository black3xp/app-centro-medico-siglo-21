<template>
          <router-link :to="url || '/'" class="contenedor-solicitudes">
            <div class="img-solicitudes">
              <img :src="icon" alt="foto servicio">
            </div>
            <p>{{nombre}}</p>
          </router-link>
</template>

<script>
export default {
  name: '',
  props: ['nombre', 'icon', 'url'],
  methods: {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
.contenedor-solicitudes{
  width: 50%;
  padding: 10px 10px 0px 0;
  color: #AAAAAA;
  text-align: center;
  .img-solicitudes{
    height: 160px;
    background-color: @card-background-serv;
    border-radius: 20px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  p{
    margin-top: 10px;
  }
}

.contenedor-solicitudes:hover{
  text-decoration: none;
}
</style>
