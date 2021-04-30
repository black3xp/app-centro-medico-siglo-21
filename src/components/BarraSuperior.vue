<template>
    <div class="barra-superior">
      <router-link :to="atras">
        <p class="icon">
          <span class="material-icons">keyboard_arrow_left</span>
        </p>
      </router-link>
      <router-link to="#" @click="cerrarSesion">
        <p class="icon">
          <span class="material-icons">power_settings_new</span>
        </p>
      </router-link>
    </div>
</template>

<script>

export default {
  name: 'BarraSuperior',
  props: ['atras'],
  methods: {
    cerrarSesion() {
      localStorage.removeItem('auth');
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
.barra-superior{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 15px;
  background-color: white;
  .icon{
    background-color: @card-background-serv;
    display: inline-block;
    padding: 7px 10px;
    color: @siglo-color;
    border-radius: 10px;
    span{
      margin-top: 3px;
    }
  }
}
</style>
