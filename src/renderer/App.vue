<template>
  <IndexPage />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexPage from "./components/pages/IndexPage.vue";
import { mailAddressModule } from "./store/modules/MailAddressModule";
import { serviceAccountModule } from "./store/modules/ServiceAccountModule";
import { serviceModule } from "./store/modules/ServiceModule";

@Component({
  name: "app",
  components: { IndexPage }
})
export default class App extends Vue {
  public created() {
    mailAddressModule.initMailAddress();
    serviceAccountModule.initServiceAccount();
    serviceModule.initService();
  }
}
</script>
