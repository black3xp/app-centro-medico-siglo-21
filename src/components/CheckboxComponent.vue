<template>
    <div class="form-check">
      <div class="checker">
        <input class="form-check-input"
          :required="requerido"
          type="checkbox"
          value=""
          :id="id"
        >
        <label class="form-check-label" :for="id">
              {{label}}
        </label>
      </div>
    </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: ['id', 'requerido', 'label', 'sintoma'],
  methods: {

  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');

</style>
