<template>
  <div class="mail-page-header">
    <BaseInput v-model="searchWord"></BaseInput>
    <BaseButton
      type="primary"
      @click="clickResitButton"
      >
      登録
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import BaseInput from "../../atoms/BaseInput.vue";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "mail-page-header",
  components: { BaseInput, BaseButton }
})
export default class MailPageHeader extends Vue {
  @Prop(String) readonly pSearchWord!: string;

  public get searchWord() {
    return this.pSearchWord;
  }

  public set searchWord(word: string) {
    this.emitValue(word);
  }

  @Emit("input")
  public emitValue(value: string) {}

  @Emit("clickResitButton")
  public clickResitButton() {}
}
</script>

<style lang="scss" scoped>
.mail-page-header {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
</style>

