<template>
  <select class="base-select" :value="value" @input="updateSelect">
    <slot v-bind:opts="opts"></slot>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "base-select"
})
export default class BaseSelect extends Vue {
  @Prop() readonly value!: any;
  @Prop({ type: Array, required: true }) readonly opts!: Array<string>;

  @Emit("input")
  public updateSelect(e: any) {
    return e.target.value;
  }
}
</script>

<style lang="scss" scoped>
.base-select {
  border-radius: 3px;
  padding: 6px;
  border: 1px solid #313131;
}
</style>

