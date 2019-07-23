<template>
  <div class="mail-page">
    <MailModal
      v-if="flag"
      @clickOutsideWindow="closeModal"
      @clickCancel="closeModal"
      @clickDone="registMailAddress">
    </MailModal>
    <MailModalEdit
      v-if="flagEdit"
      :pId="id"
      :pMailAddress="mailaddress"
      :pUrl="url"
      :pPassword="password"
      @clickOutsideWindow="closeModalEdit"
      @clickCancel="closeModalEdit"
      @clickDone="updateMailAddress">
    </MailModalEdit>
    <MailPageHeader
      v-model="searchWord"
      @clickResitButton="openModal">
    </MailPageHeader>
    <MailPageContent
      :mailaddresses="hitMailAddress"
      @clickEditButton="editMailAddress"
      @clickDeleteButton="deleteMailAddress"></MailPageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MailPageHeader from "../molecules/mailpage/MailPageHeader.vue";
import MailPageContent from "../molecules/mailpage/MailPageContent.vue";
import { MailAddress } from "../../../database/models/MailAddress";
import { mailAddressModule } from "../../store/modules/MailAddressModule";
import MailModal from "../molecules/mailpage/MailModal.vue";
import MailModalEdit from "../molecules/mailpage/MailModalEdit.vue";

@Component({
  name: "mail-page",
  components: { MailPageHeader, MailPageContent, MailModal, MailModalEdit }
})
export default class MailPage extends Vue {
  private flag: boolean = false;
  private flagEdit: boolean = false;

  private id: number = 0;
  private mailaddress: string = "";
  private password: string = "";
  private url: string = "";

  public searchWord: string = "";

  public get hitMailAddress() {
    const mails: Array<MailAddress> = mailAddressModule.mailaddresses;
    const result = mails.filter((fMailAddress: MailAddress) => fMailAddress._mailaddress.toLowerCase().indexOf(this.searchWord.toLowerCase()) === 0);
    return result;
  }

  public closeModal() {
    this.flag = false;
  }

  public openModal() {
    this.flag = true;
  }

  public closeModalEdit() {
    this.flagEdit = false;
  }

  public registMailAddress(mailAddress: MailAddress) {
    mailAddressModule.addMailAddress(mailAddress);
    this.closeModal();
  }

  public updateMailAddress(mailAddress: MailAddress) {
    mailAddressModule.updateMailAddress(mailAddress);
    this.closeModalEdit();
  }

  public deleteMailAddress(mailAddress: MailAddress) {
    mailAddressModule.deleteMailAddress(mailAddress);
  }

  public editMailAddress(mailAddress: MailAddress) {
    this.id = mailAddress._id;
    this.mailaddress = mailAddress._mailaddress;
    this.password = mailAddress._password;
    this.url = mailAddress._url;
    this.flagEdit = true;
  }
}
</script>

<style lang="scss" scoped>
.mail-page {
  display: flex;
  flex-direction: column;
}
</style>

