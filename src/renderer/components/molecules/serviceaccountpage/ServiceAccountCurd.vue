<template>
  <div class="service-account-curd">
    <div @click="clickCurd">{{serviceName}} - {{mail}}</div>
    <div>
      <BaseButton
        type="success"
        @click="clickEditButton">
        編集
      </BaseButton>
      <BaseButton
        type="danger"
        @click="clickDeleteButton">
        削除
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseButton from "../../atoms/BaseButton.vue";
import { ServiceAccount } from "../../../../database/models/ServiceAccount";
import { MailAddress } from "../../../../database/models/MailAddress";
import { mailAddressModule } from "../../../store/modules/MailAddressModule";
import { Service } from "../../../../database/models/Service";
import { serviceModule } from "../../../store/modules/ServiceModule";

@Component({
  name: "service-account-curd",
  components: { BaseButton }
})
export default class ServiceAccountCurd extends Vue {
  @Prop({ type: ServiceAccount, required: true }) readonly serviceaccount!: ServiceAccount;

  public get mail() {
    const mail: MailAddress | undefined = mailAddressModule.mailaddresses.find((found: MailAddress) => found._id === this.serviceaccount._mailaddress_id);
    if (mail) return mail._mailaddress;
  }

  public get serviceName() {
    const service: Service | undefined = serviceModule.services.find((found: Service) => found._id === this.serviceaccount._service_id);
    if (service) return service._name;
  }

  @Emit("clickCurd")
  public clickCurd() {
    return this.serviceaccount;
  }
  @Emit("clickEditButton")
  public clickEditButton() {
    return this.serviceaccount;
  }
  @Emit("clickDeleteButton")
  public clickDeleteButton() {
    return this.serviceaccount;
  }
}
</script>

<style lang="scss" scoped>
.service-account-curd {
  border-bottom: solid 1px #313131;
  padding: 4px;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  &:hover {
    background-color: #818181;
  }
}
</style>

