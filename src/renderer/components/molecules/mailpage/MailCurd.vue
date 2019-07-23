<template>
  <div class="mail-curd" @click.self="clickCurd">
    <div @click="clickCurd">{{mailaddress._mailaddress}}</div>
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
import { MailAddress } from "../../../../database/models/MailAddress";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "mail-curd",
  components: { BaseButton }
})
export default class MailCurd extends Vue {
  @Prop({ type: MailAddress, required: true }) readonly mailaddress!: MailAddress;
  @Emit("clickCurd")
  public clickCurd() {
    return this.mailaddress;
  }
  @Emit("clickEditButton")
  public clickEditButton() {
    return this.mailaddress;
  }
  @Emit("clickDeleteButton")
  public clickDeleteButton() {
    return this.mailaddress;
  }
}
</script>

<style lang="scss" scoped>
.mail-curd {
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

