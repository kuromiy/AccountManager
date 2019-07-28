<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>編集</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="service-modal-edit-content">
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
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseModal from "../../atoms/BaseModal.vue";
import BaseLabel from "../../atoms/BaseLabel.vue";
import BaseInput from "../../atoms/BaseInput.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseTitle from "../../atoms/BaseTitle.vue";
import { Service } from "../../../../database/models/Service";

@Component({
  name: "service-modal-edit",
  components: { BaseLabel, BaseInput, BaseButton, BaseModal, BaseTitle }
})
export default class ServiceModalEdit extends Vue {
  @Prop(Number) readonly pId!: number;
  @Prop(String) readonly pName!: string;
  @Prop(String) readonly pUrl!: string;

  private id: number = this.pId;
  private name: string = this.pName;
  private url: string = this.pUrl;

  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public clickDone() {
    const service: Service = new Service();
    service._id = this.id;
    service._name = this.name;
    service._url = this.url;
    return service;
  }
}
</script>

<style lang="scss" scoped>
.service-modal-edit-content {
  display: flex;
  flex-direction: column;
}
</style>

