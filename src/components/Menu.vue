<template>
    <div class="menu">
      <router-link
        :to="{ name: 'Home'}"
        class="item"
        href="#"
      >
        <span class="material-icons">home</span>
        <p>Inicio</p>
      </router-link>
      <router-link
        :to="{ name: 'Solicitudes', params: { id: 123 } }"
        class="item"
        href="#"
      >
        <span class="material-icons">search</span>
        <p>Buscar</p>
      </router-link>
      <router-link
        :to="{ name: 'Solicitudes', params: { id: 123 } }"
        class="item"
        href="#"
      >
        <span class="material-icons">error</span>
        <p>Info</p>
      </router-link>
      <router-link
        :to="{ name: 'Solicitudes', params: { id: 123 } }"
        class="item"
        href="#"
      >
        <span class="material-icons">notifications</span>
        <p>Notificacion</p>
      </router-link>
      <router-link
        :to="{ name: 'Solicitudes', params: { id: 123 } }"
        class="item"
        href="#"
      >
        <span class="material-icons">settings</span>
        <p>Ajustes</p>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
.menu{
  background-color: white;
  -webkit-box-shadow: 0px 7px 22px 0px rgba(0,0,0,0.12);
  -moz-box-shadow: 0px 7px 22px 0px rgba(0,0,0,0.12);
  box-shadow: 0px 7px 22px 0px rgba(0,0,0,0.12);
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .item{
    width: 20%;
    text-align: center;
    padding-top: 10px;
    color: @texto-serv;
  }
  .item.active{
    color: #1D7B34;
  }
  .item.router-link-active{
    color: #1D7B34;
  }
  .item:hover{
    background-color: @hover-botones;
    text-decoration: none;
  }
  p{
    font-size: 12px;
    margin-top: -5px;
  }
}
</style>
