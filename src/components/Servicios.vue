<template>
    <div class="col-3 col-sm-3">
      <router-link :to="{ path: url}" class="card-serv">
        <div class="logo-serv">
          <img v-bind:src="icono" alt="icono covid 19" />
        </div>
        <p>{{nombre}}</p>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Servicios',
  props: ['nombre', 'icono', 'url'],
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
.card-serv{
  text-decoration: none;
  .logo-serv{
    max-width: 100%;
    height: auto;
    background-color: @card-background-serv;
    padding: 12px 0;
    border-radius: 10px;
    img{
      max-width: 100%;
      height: 40px;
      display: block;
      margin: 0 auto;
    }
  }
  p{
    color: @texto-serv;
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
  }
}
.card-serv:hover{
  text-decoration: none;
  color: #1D7B34;
}
</style>
