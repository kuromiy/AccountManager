<template>
  <div>
    <ServiceCurd
      v-for="(service, index) in services"
      :key="index"
      :service="service"
      @clickCurd="clickCurd"
      @clickEditButton="clickEditButton"
      @clickDeleteButton="clickDeleteButton">
    </ServiceCurd>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Service } from "../../../../database/models/Service";
import ServiceCurd from "./ServiceCurd.vue";

@Component({
  name: "service-page-content",
  components: { ServiceCurd }
})
export default class ServicePageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly services!: Array<Service>;

  public clickCurd(service: Service) {}

  @Emit("clickEditButton")
  public clickEditButton(service: Service) {
    return service;
  }

  @Emit("clickDeleteButton")
  public clickDeleteButton(service: Service) {
    return service;
  }
}
</script>
