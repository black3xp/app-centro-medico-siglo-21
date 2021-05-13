<template>
    <div class="mb-3">
      <label :for="id" v-if="label" class="form-label">{{label}}</label>
      <input
        :type="tipo"
        class="form-control"
        :name="name"
        :id="id"
        :value="valor"
        :placeholder="placeholder"
        :required="requerido"
        :autocomplete="autocomplete"
        @input="actualizarInput"
        :readonly="readonly"
      />
    </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: ['tipo', 'id', 'placeholder', 'requerido', 'label', 'modelValue', 'name', 'autocomplete', 'valor', 'readonly'],
  methods: {
    actualizarInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');

</style>
