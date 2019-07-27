<template>
  <div class="servise-account-page-header">
    <BaseInput
      v-model="searchWord">
    </BaseInput>
    <BaseButton
      type="primary"
      @click="clickRegistButton">
      登録
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseInput from "../../atoms/BaseInput.vue";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "service-account-page-header",
  components: { BaseButton, BaseInput }
})
export default class ServiceAccountPageHeader extends Vue {
  @Prop(String) readonly pSearchWord!: string;

  public get searchWord() {
    return this.pSearchWord;
  }

  public set searchWord(word: string) {
    this.emitValue(word);
  }

  @Emit("input")
  public emitValue(value: string) {}

  @Emit("clickRegistButton")
  public clickRegistButton() {}
}
</script>

<style lang="scss" scoped>
.servise-account-page-header {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
</style>

