<template>
  <div class="service-account-page">
    <ServiceAccountModal
      v-if="flag"
      @clickOutsideWindow="closeModal"
      @clickCancel="closeModal"
      @clickDone="registServiceAccount">
    </ServiceAccountModal>
    <ServiceAccountModalEdit
      v-if="flagEdit"
      :pId="id"
      :pServiceName="serviceId"
      :pMailId="mailId"
      :pPassword="password"
      :pMemo="memo"
      @clickOutsideWindow="closeModalEdit"
      @clickCancel="closeModalEdit"
      @clickDone="updateServiceAccount">
    </ServiceAccountModalEdit>
    <ServiceAccountPageHeader
      v-model="searchWord"
      @clickRegistButton="openModal">
    </ServiceAccountPageHeader>
    <ServiceAccountContent
      :serviceAccounts="hitServiceAccounts"
      @clickEditButton="editServiceAccount"
      @clickDeleteButton="deleteServiceAccount">
    </ServiceAccountContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServiceAccountPageHeader from "../molecules/serviceaccountpage/ServiceAccountPageHeader.vue";
import ServiceAccountModal from "../molecules/serviceaccountpage/ServiceAccountModal.vue";
import { ServiceAccount } from "../../../database/models/ServiceAccount";
import { serviceAccountModule } from "../../store/modules/ServiceAccountModule";
import ServiceAccountContent from "../molecules/serviceaccountpage/ServiceAccountPageContent.vue";
import { Service } from "../../../database/models/Service";
import { serviceModule } from "../../store/modules/ServiceModule";
import ServiceAccountModalEdit from "../molecules/serviceaccountpage/ServiceAccountModalEdit.vue";

@Component({
  name: "service-account-page",
  components: { ServiceAccountPageHeader, ServiceAccountModal, ServiceAccountContent, ServiceAccountModalEdit }
})
export default class ServiceAccountPage extends Vue {
  private searchWord: string = "";
  private flag: boolean = false;
  private flagEdit: boolean = false;

  private id: number = -1;
  private mailId: string = "";
  private serviceId: string = "";
  private password: string = "";
  private memo: string = "";

  public get hitServiceAccounts() {
    const resultServiceAccounts: Array<ServiceAccount> = new Array<ServiceAccount>();
    const targetServiceAccounts: Array<ServiceAccount> = serviceAccountModule.serviceAccounts;
    // 検索ワードで前方一致でヒットしたServiceリスト
    const services: Array<Service> = serviceModule.services.filter((fService: Service) => fService._name.toLowerCase().indexOf(this.searchWord.toLowerCase()) === 0);
    services.forEach((fService: Service) => {
      targetServiceAccounts.forEach((fServiceAccount: ServiceAccount) => {
        if (fService._id === fServiceAccount._service_id) resultServiceAccounts.push(fServiceAccount);
      });
    });
    return resultServiceAccounts;
  }

  public openModal() {
    this.flag = true;
  }

  public closeModal() {
    this.flag = false;
  }

  public closeModalEdit() {
    this.flagEdit = false;
  }

  public editServiceAccount(serviceAccount: ServiceAccount) {
    console.log(serviceAccount);
    this.id = serviceAccount._id;
    this.mailId = String(serviceAccount._mailaddress_id);
    const tmp: Service | undefined = serviceModule.services.find((fService: Service) => fService._id === serviceAccount._service_id);
    if (tmp) this.serviceId = tmp._name;
    this.password = serviceAccount._password;
    this.memo = serviceAccount._memo;
    // ここでモーダルを開く
    this.flagEdit = true;
  }

  public updateServiceAccount(serviceAccount: ServiceAccount) {
    serviceAccountModule.updateServiceAccount(serviceAccount);
    this.flagEdit= false;
  }

  public deleteServiceAccount(serviceAccount: ServiceAccount) {
    serviceAccountModule.deleteServiceAccount(serviceAccount);
  }

  public registServiceAccount(serviceAccount: ServiceAccount) {
    serviceAccountModule.addServiceAccount(serviceAccount);
    this.closeModal();
  }
}
</script>
