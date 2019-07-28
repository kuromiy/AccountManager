<template>
  <div class="service-curd">
    <div @click="clickCurd">{{service._name}}</div>
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
import BaseButton from "../../atoms/BaseButton.vue";
import { Service } from "../../../../database/models/Service";

@Component({
  name: "service-curd",
  components: { BaseButton }
})
export default class ServiceCurd extends Vue {
  @Prop({ type: Service, required: true }) readonly service!: Service;

  @Emit("clickCurd")
  public clickCurd() {
    return this.service;
  }

  @Emit("clickEditButton")
  public clickEditButton() {
    return this.service;
  }

  @Emit("clickDeleteButton")
  public clickDeleteButton() { 
    return this.service;
  }
}
</script>

<style lang="scss" scoped>
.service-curd {
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

