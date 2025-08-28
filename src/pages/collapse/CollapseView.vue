<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiCollapse, UiCollapseItem } from "@/lib";
  const collapse = ref([]);
  const collapse1 = ref([]);
  const collapse2 = ref("");
  const collapse3 = ref("");
  const multiple = ref(true);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Collapse</h1>
    <div class="global-top">
      <div class="global-top__item">
        <h3>Multiple</h3>
        <ui-switch v-model="multiple" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Mode: Default</div>
      <div>
        <UiCollapse v-if="multiple" v-model="collapse">
          <UiCollapseItem title="Title 1" value="1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 2" value="2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 3" value="3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
        </UiCollapse>
        <UiCollapse v-else :multiple="false" v-model="collapse2">
          <UiCollapseItem title="Title 1" value="1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 2" value="2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 3" value="3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
        </UiCollapse>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Mode: Custom</div>
      <div>
        <UiCollapse v-if="multiple" mode="custom" v-model="collapse1">
          <UiCollapseItem
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!"
            value="1"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 2" value="2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 3" value="3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
        </UiCollapse>
        <UiCollapse v-else :multiple="false" mode="custom" v-model="collapse3">
          <UiCollapseItem
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!"
            value="1"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 2" value="2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
          <UiCollapseItem title="Title 3" value="3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut omnis dolorem ea ducimus fuga architecto nemo
            ratione, nobis veniam expedita impedit soluta eum, harum at dolorum quis ullam illum neque!
          </UiCollapseItem>
        </UiCollapse>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
        grid-column: span 2;
      }

      &__row {
        font-weight: bold;
      }
    }
  }
</style>
