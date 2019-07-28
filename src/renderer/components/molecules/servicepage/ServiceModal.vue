<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規登録</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="service-modal-content">
        <BaseLabel>サービス名</BaseLabel>
        <BaseInput v-model="name"></BaseInput>
        <BaseLabel>URL</BaseLabel>
        <BaseInput v-model="url"></BaseInput>
      </div>
    </template>
    <template v-slot:footer>
      <div>
        <BaseButton
          @click="clickCancel">
          キャンセル
        </BaseButton>
        <BaseButton
          @click="clickDone">
          登録
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import BaseLabel from "../../atoms/BaseLabel.vue";
import BaseInput from "../../atoms/BaseInput.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import { Service } from "../../../../database/models/Service";
import BaseModal from "../../atoms/BaseModal.vue";
import BaseTitle from "../../atoms/BaseTitle.vue";

@Component({
  name: "service-modal",
  components: { BaseLabel, BaseInput, BaseButton, BaseModal, BaseTitle }
})
export default class ServiceModal extends Vue {
  private name: string = "";
  private url: string = "";

  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public clickDone() {
    const service: Service = new Service();
    service._name = this.name;
    service._url = this.url;
    return service;
  }
}
</script>

<style lang="scss" scoped>
.service-modal-content {
  display: flex;
  flex-direction: column;
}
</style>

