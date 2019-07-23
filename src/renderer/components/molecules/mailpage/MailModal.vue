<template>
  <BaseModal
    @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規登録</BaseTitle>
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
import { MailAddress } from "../../../../database/models/MailAddress";

@Component({
  name: "mail-modal",
  components: { BaseModal, BaseButton, BaseTitle, BaseLabel, BaseInput }
})
export default class MailModal extends Vue {
  private mailaddress: string = "";
  private url: string = "";
  private password: string = "";

  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
  @Emit("clickCancel")
  public clickCancel() {}
  @Emit("clickDone")
  public clickDone() {
    const mailaddress: MailAddress = new MailAddress();
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

