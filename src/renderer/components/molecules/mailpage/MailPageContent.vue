<template>
  <div>
    <MailCurd
      v-for="(mailaddress, index) in mailaddresses"
      :key="index"
      :mailaddress="mailaddress"
      @clickCurd="clickCurd"
      @clickEditButton="clickEditButton"
      @clickDeleteButton="clickDeleteButton">
    </MailCurd>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { MailAddress } from "../../../../database/models/MailAddress";
import MailCurd from "./MailCurd.vue";

@Component({
  name: "mail-page-content",
  components: { MailCurd }
})
export default class MailPageContent extends Vue {
  @Prop({type: Array, required: true}) readonly mailaddresses!: Array<MailAddress>;

  public clickCurd(mailAddress: MailAddress) {
    console.log("mail");
    console.log(mailAddress);
  }

  @Emit("clickEditButton")
  public clickEditButton(mailAddress: MailAddress) {
    return mailAddress;
  }

  @Emit("clickDeleteButton")
  public clickDeleteButton(mailAddress: MailAddress) {
    return mailAddress;
  }
}
</script>
