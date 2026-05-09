<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  const demoDisabled = ref(false);

  const bareOff = ref(false);
  const bareOn = ref(true);
  const withLabel = ref(true);
  const withLabelAndText = ref(false);
  const textLeft = ref(false);
  const asyncGuarded = ref(false);

  const disabledOffDemo = ref(false);
  const disabledOnDemo = ref(true);
  const loadingDemo = ref(false);

  const beforeAsyncToggle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    asyncGuarded.value = !asyncGuarded.value;
    return true;
  };
</script>

<template>
  <div class="page">
    <h1 class="global-title">Switch</h1>

    <div class="grid">
      <div class="grid__header">Track only</div>
      <p class="grid__hint">No label or description — switch track only</p>
      <div class="flex-row flex-row--gap">
        <span class="flex-row__tag">Off</span>
        <UiSwitch v-model="bareOff" :disabled="demoDisabled" />
        <span class="flex-row__tag">On</span>
        <UiSwitch v-model="bareOn" :disabled="demoDisabled" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Label</div>
      <UiSwitch v-model="withLabel" label="Notifications" :disabled="demoDisabled" />
    </div>

    <div class="grid">
      <div class="grid__header">Label + text</div>
      <UiSwitch
        v-model="withLabelAndText"
        label="Email alerts"
        text="Text is shown to the right of the track by default"
        :disabled="demoDisabled"
      />
    </div>

    <div class="grid">
      <div class="grid__header">Text on the left</div>
      <UiSwitch
        v-model="textLeft"
        label="Dark mode"
        text="Use dark theme across the app"
        :text-position-right="false"
        :disabled="demoDisabled"
      />
    </div>

    <div class="grid">
      <div class="grid__header">Disabled</div>
      <div class="flex-row flex-row--gap">
        <UiSwitch v-model="disabledOffDemo" disabled label="Unavailable" text="Cannot be turned on" />
        <UiSwitch v-model="disabledOnDemo" disabled label="Locked on" text="Cannot be turned off" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Loading</div>
      <UiSwitch v-model="loadingDemo" loading label="Saving…" text="Please wait" />
    </div>

    <div class="grid">
      <div class="grid__header">beforeChange (async)</div>
      <p class="grid__hint">
        With <code>beforeChange</code>, the component does not flip v-model itself — update it inside the handler (here
        after a short delay)
      </p>
      <UiSwitch
        v-model="asyncGuarded"
        label="Guarded toggle"
        text="Async handler before state updates"
        :before-change="beforeAsyncToggle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .grid {
    display: grid;
    align-items: center;
    gap: 12px;
    grid-template-columns: 1fr;

    &__header {
      width: max-content;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--color-separator-border-primary, currentColor);
      font-size: 18px;
      font-weight: bold;
    }

    &__hint {
      max-width: 42rem;
      margin: -4px 0 0;
      color: var(--color-text-secondary);
      font-size: 13px;
      line-height: 1.4;

      code {
        font-size: 0.95em;
      }
    }
  }

  .flex-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;

    &--gap {
      gap: 24px;
    }

    &__tag {
      color: var(--color-text-secondary);
      font-size: 13px;
      font-weight: 500;
    }

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }
  }
</style>
