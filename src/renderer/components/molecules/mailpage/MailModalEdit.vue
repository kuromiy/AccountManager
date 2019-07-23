<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>更新</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="mail-modal-content">
        <BaseLabel>メールアドレス</BaseLabel>
        <BaseInput v-model="mailaddress"></BaseInput>
        <BaseLabel>パスワード</BaseLabel>
        <BaseInput v-model="password"></BaseInput>
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
          更新
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
import BaseLabel from "../../atoms/BaseLabel.vue";
import BaseInput from "../../atoms/BaseInput.vue";
import { MailAddress } from "../../../../database/models/MailAddress";

@Component({
  name: "mail-modal-edit",
  components: { BaseModal, BaseButton, BaseTitle, BaseLabel, BaseInput }
})
export default class MailModalEdit extends Vue {
  @Prop(Number) readonly pId!: number;
  @Prop(String) readonly pMailAddress!: string;
  @Prop(String) readonly pUrl!: string;
  @Prop(String) readonly pPassword!: string;

  private id: number = this.pId;
  private mailaddress: string = this.pMailAddress;
  private url: string = this.pUrl;
  private password: string = this.pPassword;

  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public clickDone() {
    const mailaddress: MailAddress = new MailAddress();
    mailaddress._id = this.id;
    mailaddress._mailaddress = this.mailaddress;
    mailaddress._password = this.password;
    mailaddress._url = this.url;
    return mailaddress;
  }
}
</script>

<style lang="scss">
.mail-modal-content {
  display: flex;
  flex-direction: column;
}
</style>

