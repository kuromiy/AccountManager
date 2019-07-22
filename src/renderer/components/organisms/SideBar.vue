<template>
  <div class="side-bar">
    <BaseIcon
      v-for="(data, index) in datas"
      :key="index"
      @click="movePage(data)">
      {{data.name}}
    </BaseIcon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseIcon from "../atoms/BaseIcon.vue";

@Component({
  name: "side-bar",
  components: { BaseIcon }
})
export default class SideBar extends Vue {
  private datas = [
    { name: "Account", routerInfo: "" },
    { name: "Service", routerInfo: "" },
    { name: "Mail", routerInfo: "" },
  ];

  public movePage(data: any) {
    this.$router.push(data.routerInfo);
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  display: flex;
  flex-direction: column;
}
</style>

