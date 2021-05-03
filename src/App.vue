<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="less">
@import './assets/style/global.less';
body{
  font-family: @font-primary;
  color: @color-primary;
  padding: 70px 15px 15px 15px;
}
  h2.title{
    font-weight: 300;
    margin-top: 20px;
    margin-bottom: 20px;
  }
.alert-danger{
  border: none;
}
.item{
  text-decoration: none !important;
}
.alert-danger::after{
  content: '';
  width: 0;
  height: 0;
  border-left: 15px solid #f8d7da;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  transform: rotate(90deg);
  left: 48%;
  bottom: -15px;
  position: absolute;
}
.btn-danger{
  background-color: #f8d7da;
  color: #842029;
  border-color: #842029;
}
.btn-success{
  background-color: #dceadf;
  color: @siglo-color;
  border-color: @siglo-color;
}
input, select{
  height: 50px;
}
.form-control, .form-select{
  border-radius: 10px;
  -webkit-box-shadow: 0px 4px 17px -11px rgba(0,0,0,0.10);
  -moz-box-shadow: 0px 4px 17px -11px rgba(0,0,0,0.10);
  box-shadow: 0px 4px 17px -11px rgba(0,0,0,0.10);
  border-color: #E4E4E4;
  color: #707070;
}
.form-control::placeholder{
  color: #70707079;
}
.cargador{
  width: 50px;
  height: 50px;
  margin: 20px auto;
}
</style>
