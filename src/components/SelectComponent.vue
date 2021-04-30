<template>
    <div class="mb-3">
      <label :for="id" class="form-label">{{label}}</label>
      <select
        class="form-select"
        :id="id"
        :required="requerido"
        :value="modelValue"
        @change="updateValue"
      >
        <option value="" selected disabled>- {{placeholder}} -</option>
        <slot></slot>
      </select>
    </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: ['id', 'placeholder', 'requerido', 'label', 'modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/style/global.less');

</style>
