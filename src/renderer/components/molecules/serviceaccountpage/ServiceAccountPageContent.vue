<template>
  <div>
    <ServiceAccountCurd
      v-for="(serviceAccount, index) in serviceAccounts"
      :key="index"
      :serviceaccount="serviceAccount"
      @clickCurd="clickCurd"
      @clickEditButton="clickEditButton"
      @clickDeleteButton="clickDeleteButton">
    </ServiceAccountCurd>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import ServiceAccountCurd from "./ServiceAccountCurd.vue";
import { ServiceAccount } from "../../../../database/models/ServiceAccount";

@Component({
  name: "service-account-page-content",
  components: { ServiceAccountCurd }
})
export default class ServiceAccountPageContent extends Vue {
  @Prop({type: Array, required: true}) readonly serviceAccounts!: Array<ServiceAccount>;

  public clickCurd(serviceAccount: ServiceAccount) {
    
  }

  @Emit("clickEditButton")
  public clickEditButton(serviceAccount: ServiceAccount) {
    return serviceAccount;
  }

  @Emit("clickDeleteButton")
  public clickDeleteButton(serviceAccount: ServiceAccount) {
    return serviceAccount;
  }
}
</script>
