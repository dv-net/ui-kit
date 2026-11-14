<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { onClickOutside } from "@vueuse/core";
  import { computed, ref, useTemplateRef } from "vue";

  import { type ViewModeId, viewModes } from "./modes";

  const search = ref("");
  const open = ref(false);
  const selectedId = ref<ViewModeId>("auto");
  const root = useTemplateRef<HTMLElement>("root");

  const current = computed(() => viewModes.find((mode) => mode.id === selectedId.value) ?? viewModes[0]);

  const toggle = () => {
    open.value = !open.value;
  };

  const select = (id: ViewModeId) => {
    if (id === selectedId.value) return;

    selectedId.value = id;
  };

  onClickOutside(root, () => {
    open.value = false;
  });
</script>

<template>
  <div class="search-group">
    <label class="search">
      <UiIcon class="search__icon" type="100" name="search  1" size="xs" />
      <input v-model="search" class="search__input" type="search" placeholder="Search" />
    </label>

    <nav ref="root" class="switcher" :class="{ 'switcher--open': open }">
      <div class="switcher__inner">
        <div class="switcher__clip">
          <div class="switcher__items">
            <button
              v-for="mode in viewModes"
              :key="mode.id"
              type="button"
              class="switcher__option"
              :class="{ 'switcher__option--active': mode.id === selectedId }"
              @click="select(mode.id)"
            >
              <UiIcon type="100" :name="mode.icon" size="xs" />
              {{ mode.label }}
            </button>
          </div>
        </div>

        <button type="button" class="switcher__trigger" aria-label="View mode" @click="toggle">
          <span class="switcher__trigger-icon">
            <Transition name="switch" mode="out-in">
              <span :key="current.id" class="switcher__current">
                <UiIcon type="100" :name="current.icon" size="sm" />
              </span>
            </Transition>
          </span>
          <span class="switcher__hover" aria-hidden="true" />
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
  .search-group {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 8px;
  }

  .search {
    display: flex;
    min-width: 0;
    height: 40px;
    flex: 1;
    align-items: center;
    padding: 0 12px;
    border: 1px solid var(--color-separator-border-primary);
    border-radius: 12px;
    background: var(--color-white);
    gap: 8px;

    &__icon {
      flex-shrink: 0;
      color: var(--color-icon-tertiary);
    }

    &__input {
      width: 100%;
      min-width: 0;
      border: 0;
      background: transparent;
      color: var(--color-text-primary);
      font-size: 14px;
      outline: none;

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }

  .switcher {
    --size: 40px;
    --overshoot: 100px;
    --shadow: 0 4px 4px rgb(0 0 0 / 2%), 0 -2px 4px rgb(0 0 0 / 2%), 0 4px 20px rgb(0 0 0 / 8%);

    position: relative;
    z-index: 2;
    display: flex;
    width: var(--size);
    flex-shrink: 0;
    justify-content: flex-end;

    &__inner {
      position: relative;
      display: grid;
      width: max-content;
      justify-content: flex-end;
      grid-template-columns: minmax(0, 1fr) var(--size);
      justify-items: end;
      pointer-events: none;
    }

    &__clip {
      position: relative;
      z-index: 1;
      display: flex;
      margin-inline-end: -8px;
      overflow-x: clip;
      padding-inline-start: calc(20px + var(--overshoot));
    }

    &__items {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding: 4px 16px 4px 4px;
      border-radius: 52px 0 0 52px;
      background: var(--color-white);
      box-shadow: var(--shadow);
      gap: 4px;
      pointer-events: auto;
      transform-origin: 100% 50%;
      transition:
        translate 0.75s cubic-bezier(0.68, 0, 0.27, 1.5),
        scale 0.75s cubic-bezier(0.68, 0, 0.27, 1.5),
        box-shadow 0.75s cubic-bezier(0.68, 0, 0.27, 1.5);
    }

    &:not(&--open) &__items {
      box-shadow: none;
      scale: 0 1;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.2);
      translate: var(--size) 0;
    }

    &__option {
      display: flex;
      height: 32px;
      align-items: center;
      padding: 0 10px;
      border: 0;
      border-radius: 100px;
      background: var(--color-background-secondary);
      color: var(--color-text-primary);
      cursor: pointer;
      font-size: 12px;
      gap: 4px;
      white-space: nowrap;

      @media (hover: hover) {
        &:hover {
          background: var(--color-background-tertiary);
        }
      }

      &--active {
        background: var(--color-background-tertiary);
      }
    }

    &__trigger {
      position: relative;
      z-index: 2;
      display: flex;
      width: var(--size);
      height: var(--size);
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 8px;
      background: var(--color-white);
      box-shadow: var(--shadow);
      color: var(--color-icon-secondary);
      cursor: pointer;
      isolation: isolate;
      pointer-events: auto;
      transition: background-color 0.2s ease;

      @media (hover: hover) {
        &:hover {
          background: hsl(from var(--color-background-tertiary) h s 90%);
        }
      }

      &:active {
        background: hsl(from var(--color-background-tertiary) h s 84%);
      }
    }

    &__trigger-icon {
      position: relative;
      z-index: 1;
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
    }

    &__current {
      display: flex;
    }

    &__hover {
      position: absolute;
      z-index: 0;
      overflow: hidden;
      border-radius: inherit;
      inset: 0;
      pointer-events: none;

      &::before,
      &::after {
        position: absolute;
        z-index: -1;
        width: 100%;
        border-radius: 50%;
        aspect-ratio: 1;
        background: var(--color-text-primary);
        content: "";
        inset-block-start: 50%;
        inset-inline-start: 50%;
        opacity: 0.04;
        scale: 0 0;
        translate: -50% -50%;
        visibility: hidden;
      }
    }

    @media (hover: hover) {
      &__trigger:hover &__hover::after {
        opacity: 0;
        scale: 1 1;
        transition:
          scale 0.5s ease,
          opacity 0.5s ease 0.25s;
        visibility: visible;
      }
    }

    &__trigger:active &__hover {
      &::before {
        opacity: 0;
        scale: 1 1;
        transition:
          scale 0.5s ease,
          opacity 0.5s ease 0.25s;
        visibility: visible;
      }

      &::after {
        display: none;
      }
    }
  }

  .switch-enter-active,
  .switch-leave-active {
    transition:
      opacity 0.25s ease,
      translate 0.25s ease;
  }

  .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    translate: 0 -150%;
  }

  .switch-leave-to {
    translate: 0 150%;
  }
</style>
