<template>
  <div class="service-page">
    <ServiceModalShow
      v-if="flagShow"
      :service="showService"
      @clickOutsideWindow="closeModalShow"
      @clickCancel="closeModalShow"
      @clickDone="deleteService">
    </ServiceModalShow>
    <ServiceModal
      v-if="flag"
      @clickOutsideWindow="closeModal"
      @clickCancel="closeModal"
      @clickDone="registService">
    </ServiceModal>
    <ServiceModalEdit
      v-if="flagEdit"
      :pId="id"
      :pName="name"
      :pUrl="url"
      @clickOutsideWindow="closeModalEdit"
      @clickCancel="closeModalEdit"
      @clickDone="updateService">
    </ServiceModalEdit>
    <ServicePageHeader
      v-model="searchWord"
      @clickRegistButton="openModal">
    </ServicePageHeader>
    <ServicePageContent
      :services="hitServices"
      @clickEditButton="editService"
      @clickDeleteButton="confirmService">
    </ServicePageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServicePageContent from "../molecules/servicepage/ServicePageContent.vue";
import { serviceModule } from "../../store/modules/ServiceModule";
import { Service } from "../../../database/models/Service";
import ServicePageHeader from "../molecules/servicepage/ServicePageHeader.vue";
import ServiceModal from "../molecules/servicepage/ServiceModal.vue";
import ServiceModalEdit from "../molecules/servicepage/ServiceModalEdit.vue";
import ServiceModalShow from "../molecules/servicepage/ServiceModalShow.vue";
import { serviceAccountModule } from "../../store/modules/ServiceAccountModule";
import { ServiceAccount } from "../../../database/models/ServiceAccount";

@Component({
  name: "service-page",
  components: { ServicePageContent, ServicePageHeader, ServiceModal, ServiceModalEdit, ServiceModalShow }
})
export default class ServicePage extends Vue {
  private flag: boolean = false;
  private flagEdit: boolean = false;
  private flagShow: boolean = false;
  private searchWord: string = "";

  private showService: Service = new Service();

  private id: number = -1;
  private name: string = "";
  private url: string = "";

  public openModal() {
    this.flag = true;
  }

  public closeModal() {
    this.flag = false;
  }

  public closeModalShow() {
    this.flagShow = false;
  }

  public get hitServices() {
    const services = serviceModule.services;
    const result = services.filter((fService: Service) => fService._name.toLowerCase().indexOf(this.searchWord.toLowerCase()) === 0);
    return result;
  }

  public registService(service: Service) {
    serviceModule.addService(service);
    this.flag = false;
  }

  public updateService(service: Service) {
    serviceModule.updateService(service);
    this.flagEdit = false;
  }

  public editService(service: Service) {
    this.id = service._id;
    this.name = service._name;
    this.url = service._url;
    this.flagEdit = true;
  }

  public closeModalEdit() {
    this.flagEdit = false;
  }

  public deleteService(service: Service) {
    console.log(service);
    // ひもづいたServiceAccountの削除
    // Serviceの削除
    const linkServiceAccounts = serviceAccountModule.serviceAccounts.filter((fServiceAccounts: ServiceAccount) => fServiceAccounts._service_id === service._id);
    linkServiceAccounts.forEach((fServiceAccount: ServiceAccount) => {
      serviceAccountModule.deleteServiceAccount(fServiceAccount);
    });
    serviceModule.deleteService(service);
    this.flagShow = false;
  }

  public confirmService(service: Service) {
    // 紐づいたアカウントサービス一覧を表示
    // 「本当に削除してよいか」の確認ダイアログを出す。
    this.showService = service;
    this.flagShow = true;
  }
}
</script>
