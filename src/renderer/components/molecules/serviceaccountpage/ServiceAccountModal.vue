<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規登録</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="service-account-modal-content">
        <BaseLabel>サービス名</BaseLabel>
        <BaseInput
          v-model="serviceName"
          autocomplete="on"
          list="tmp">
        </BaseInput>
        <datalist id="tmp">
          <option
            v-for="(service, index) in serviceList"
            :key="index">
            {{service._name}}
          </option>
        </datalist>
        <BaseLabel>メールアドレス</BaseLabel>
        <BaseSelect
          :opts="mailList"
          v-model="mail_id">
          <template v-slot:default="slotProps">
            <option v-for="(opt, index) in slotProps.opts" :key="index" :value="opt._id">{{opt._mailaddress}}</option>
          </template>
        </BaseSelect>
        <BaseLabel>パスワード</BaseLabel>
        <BaseInput v-model="password"></BaseInput>
        <BaseLabel>備考</BaseLabel>
        <BaseInput v-model="memo"></BaseInput>
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
import BaseModal from "../../atoms/BaseModal.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseTitle from "../../atoms/BaseTitle.vue";
import BaseLabel from "../../atoms/BaseLabel.vue";
import BaseInput from "../../atoms/BaseInput.vue";
import BaseSelect from "../../atoms/BaseSelect.vue";
import { ServiceAccount } from "../../../../database/models/ServiceAccount";
import { serviceModule } from "../../../store/modules/ServiceModule";
import { Service } from "../../../../database/models/Service";
import { mailAddressModule } from "../../../store/modules/MailAddressModule";

@Component({
  name: "service-account-modal",
  components: { BaseModal, BaseButton, BaseTitle, BaseLabel, BaseInput, BaseSelect }
})
export default class ServiceAccountModal extends Vue {
  private serviceName: string = "";
  private mail_id: string = "";
  private password: string = "";
  private memo: string = "";

  public get serviceList() {
    return serviceModule.services;
  }

  public get mailList() {
    return mailAddressModule.mailaddresses;
  }

  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public async clickDone() {
    const serviceAccount: ServiceAccount = new ServiceAccount();
    const service: Service | undefined = this.serviceList.find((foundService: Service) => foundService._name === this.serviceName);
    if (service) {
      serviceAccount._service_id = service._id;
    } else {
      const newService: Service = new Service();
      newService._name = this.serviceName;
      newService._url = "";
      // TODO ここでVuexと通信するべきではない？
      const tmp: Service = await serviceModule.addService(newService);
      serviceAccount._service_id = tmp._id;
    }
    serviceAccount._mailaddress_id = Number.parseInt(this.mail_id, 10);
    serviceAccount._password = this.password;
    serviceAccount._memo = this.memo;
    return serviceAccount;
  }
}
</script>

<style lang="scss" scoped>
.service-account-modal-content {
  display: flex;
  flex-direction: column;
}
</style>

