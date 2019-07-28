<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>削除しますか？</BaseTitle>
    </template>
    <template v-slot:content>
      <div
        v-for="(t, index) in showAccounts"
        :key="index">
        {{t}}
      </div>
    </template>
    <template v-slot:footer>
      <div>
        <BaseButton
          @click="clickCancel">
          いいえ
        </BaseButton>
        <BaseButton
          @click="clickDone">
          はい
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import BaseModal from "../../atoms/BaseModal.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseTitle from "../../atoms/BaseTitle.vue";
import { ServiceAccount } from "../../../../database/models/ServiceAccount";
import { mailAddressModule } from "../../../store/modules/MailAddressModule";
import { MailAddress } from "../../../../database/models/MailAddress";
import { Service } from "../../../../database/models/Service";
import { serviceAccountModule } from "../../../store/modules/ServiceAccountModule";

@Component({
  name: "service-modal-show",
  components: { BaseModal, BaseButton, BaseTitle }
})
export default class ServiceModalShow extends Vue {
  @Prop(Service) readonly service!: Service;
  // @Prop({ type: Array, required: true }) readonly serviceAccounts!: Array<ServiceAccount>;

  public get showAccounts() {
    const serviceAccounts = serviceAccountModule.serviceAccounts.filter((fServiceAccount: ServiceAccount) => fServiceAccount._service_id === this.service._id);
    const tmp: Array<string | undefined> = serviceAccounts.map((fServiceAccount: ServiceAccount) => {
      const tmpmail = mailAddressModule.mailaddresses.find((fMailAddress: MailAddress) => fMailAddress._id === fServiceAccount._mailaddress_id);
      if (tmpmail) return tmpmail._mailaddress;
    });
    return tmp;
  }

  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public clickDone() {
    return this.service;
  }
  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
}
</script>
