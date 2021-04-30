<template>
    <div class="pantalla-carga">
      <div class="carga">
        <Cargador/>
        Cargando
      </div>
    </div>
</template>

<script>
import Cargador from '@/components/Cargador.vue';

export default {
  name: '',
  components: {
    Cargador,
  },
  methods: {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');
.pantalla-carga{
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .carga{
    width: 70px;
    height: 70px;
    margin: 150px auto;
  }
}
</style>
