<script setup lang="ts">
  import UiFlagIcon from "@/lib/components/UiFlagIcon/UiFlagIcon.vue";
  import UiLanguageButton from "@/lib/components/UiLanguages/components/UiLanguageButton.vue";

  import { capitalize, computed, nextTick, onMounted, ref } from "vue";

  import { config, UiDrawer, UiIcon, UiInput, UiModal } from "@/lib";
  import SearchIcon from "@/lib/assets/others/icons/search.svg";
  import { Locale, UiLanguagesProps } from "@/lib/components/UiLanguages/types";
  import { useBreakpoints } from "@/lib/composables/useBreakpoints";

  const emits = defineEmits(["change"]);
  const props = withDefaults(defineProps<UiLanguagesProps>(), {
    forHeader: false,
    minNumbersLocalesDisplayFavorites: 10
  });

  const modelValue = defineModel<Locale>({ default: null });
  const isShow = defineModel<boolean>("is-show", { default: false });
  const { isMobile } = useBreakpoints();
  const searchValue = ref("");
  const inputRef = ref();
  const navigatorLanguages = ref<Locale[]>([]);

  const sortedFavouriteLocales = computed(() => {
    return [
      { id: 2, name: "English", isoCode: "en", nativeName: "English" },
      ...navigatorLanguages.value,
      modelValue.value
    ].filter((obj, index, self) => index === self.findIndex((o) => o.isoCode === obj.isoCode));
  });

  const sortedLocales = computed(() => {
    return props.locales.toSorted((a, b) => a.name.localeCompare(b.name));
  });

  const filteredLocales = computed(() => {
    if (searchValue.value) {
      return sortedLocales.value.filter(
        (item) =>
          item.name.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) ||
          item.nativeName?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())
      );
    } else {
      return sortedLocales.value;
    }
  });

  function setLocale(locale: Locale) {
    modelValue.value = locale;
    isShow.value = false;
    searchValue.value = "";
    emits("change", locale);
  }

  function openModal() {
    isShow.value = true;
    nextTick(() => {
      inputRef.value?.focus();
    });
  }

  onMounted(() => {
    const arrayLocales: string[] = navigator.languages.slice(0, 2).map((lang) => lang.split("-")[0]);
    navigatorLanguages.value = props.locales.filter(({ isoCode }) => arrayLocales.includes(isoCode));
  });
</script>

<template>
  <div class="ui-languages">
    <button
      v-if="!isHidden"
      :disabled="disabled"
      :class="{ 'for-header': forHeader }"
      @click="openModal"
      class="ui-languages--trigger"
    >
      <slot :locale="modelValue" name="trigger">
        <template v-if="forHeader">
          <UiFlagIcon :isoCode="modelValue?.isoCode ?? ''" is-small />
          {{ capitalize(modelValue?.isoCode ?? "") }}
        </template>
        <template v-else>
          <UiFlagIcon :isoCode="modelValue?.isoCode ?? ''" />
          {{ modelValue?.name }}
          <template v-if="modelValue?.nativeName">({{ modelValue?.nativeName }})</template>
        </template>
      </slot>
    </button>

    <UiModal
      v-if="!isMobile"
      @close="searchValue = ''"
      v-model="isShow"
      :isShowBtnClose="false"
      popperClass="transparent-bg"
    >
      <div class="ui-languages--modal">
        <div class="ui-languages--modal__search">
          <UiInput
            ref="inputRef"
            autofocus
            size="sm"
            v-model="searchValue"
            :placeholder="config.uiLanguages.translations.searchInputPlaceholder"
          >
            <template #prepend>
              <search-icon />
            </template>
          </UiInput>
        </div>
        <div class="ui-languages--modal__items" :class="{ 'is-empty': !filteredLocales.length }">
          <div
            class="ui-languages__favourites"
            v-if="sortedFavouriteLocales?.length && filteredLocales.length >= minNumbersLocalesDisplayFavorites"
          >
            <UiLanguageButton
              v-for="locale in sortedFavouriteLocales"
              :key="locale.id"
              :locale="locale"
              @change="setLocale"
              :selected="modelValue"
              :for-header="forHeader"
            />
          </div>
          <div v-if="filteredLocales.length">
            <UiLanguageButton
              v-for="locale in filteredLocales"
              :key="locale.id"
              :locale="locale"
              @change="setLocale"
              :selected="modelValue"
              :for-header="forHeader"
            />
          </div>
          <div class="ui-languages--modal__empty" v-else>
            {{ config.uiLanguages.translations.modalSearchNotFound }}
          </div>
        </div>
      </div>
    </UiModal>
    <UiDrawer class="ui-languages--drawer" direction="btt" v-else v-model="isShow">
      <div class="ui-languages--drawer__wrapper">
        <div class="ui-languages--drawer__header">
          <p>{{ config.uiLanguages.translations.changeLanguage }}</p>
          <UiIcon name="close" type="400" size="lg" />
        </div>
        <div class="ui-languages--drawer__search">
          <UiInput
            ref="inputRef"
            autofocus
            size="sm"
            v-model="searchValue"
            clearable
            :placeholder="config.uiLanguages.translations.searchInputPlaceholder"
          >
            <template #prepend>
              <search-icon />
            </template>
          </UiInput>
        </div>
        <div class="ui-languages--drawer__items">
          <div
            class="ui-languages__favourites"
            v-if="sortedFavouriteLocales?.length && filteredLocales.length >= minNumbersLocalesDisplayFavorites"
          >
            <UiLanguageButton
              v-for="locale in sortedFavouriteLocales"
              :key="locale.id"
              :locale="locale"
              @change="setLocale"
              :selected="modelValue"
              :for-header="forHeader"
            />
          </div>
          <UiLanguageButton
            v-for="locale in filteredLocales"
            :key="locale.id"
            :locale="locale"
            @change="setLocale"
            :selected="modelValue"
            :for-header="forHeader"
          />
        </div>
      </div>
    </UiDrawer>
  </div>
</template>

<style lang="scss">
  .transparent-bg {
    .ui-modal__content {
      padding: 0 !important;
      background: transparent !important;
    }
  }

  .ui-languages {
    &--trigger {
      display: flex;
      width: 100%;
      height: 44px;
      align-items: center;
      padding: 0 12px;
      border: none;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 0 0 1px var(--color-separator-border-primary) inset;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      gap: 12px;
      transition: var(--transition);

      &:hover {
        box-shadow: 0 0 0 1px var(--color-state-secondary-hover) inset;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    &--drawer {
      .ui-languages--modal__item {
        min-height: 44px;
      }

      .ui-drawer {
        border-radius: 12px 12px 0 0;
      }

      &__wrapper {
        height: 100%;
        padding-top: 12px;
      }

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 500;
        gap: 12px;
        line-height: 24px;
      }

      &__search {
        padding: 8px 16px;
      }

      &__items {
        overflow: hidden auto;
        height: calc(100% - 44px);
      }
    }

    &--modal {
      width: calc(100vw - 32px);
      max-width: 400px;
      padding: 32px 24px 24px;
      border-radius: 24px;
      background: #f7f7f7;

      &__search {
        margin-bottom: 16px;

        .ui-input {
          border-radius: 100px;
          background-color: #e2e2e6;
          box-shadow: none;
          color: #717173;
          gap: 12px;

          &__input {
            color: #717173;
            font-size: 14px;
            font-weight: 500;

            &::placeholder {
              color: #717173;
            }
          }
        }
      }

      &__items {
        min-height: 512px;
        max-height: 512px;
        border-radius: 16px;
        background: var(--color-background-primary);
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          border-radius: 0 16px 0 0;
          margin: 15px 0;
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 16px;
          background: #cbd1db;

          &:hover {
            background: #aaadb3;
            background-clip: padding-box;
          }
        }

        &.is-empty {
          display: flex;
          flex-direction: column;
        }

        > div {
          padding: 4px;
        }
      }

      &__item {
        display: flex;
        overflow: hidden;
        width: 100%;
        min-height: 56px;
        align-items: center;
        padding: 0 16px;
        border: none;
        border-radius: 12px;
        background: transparent;
        color: #1a1c1f;
        cursor: pointer;
        font-family: inherit;
        font-size: 16px;
        font-weight: 400;
        gap: 12px;
        text-overflow: ellipsis;
        transition: var(--transition);
        white-space: nowrap;

        .ui-icon {
          margin-left: auto;
        }

        &:hover {
          background-color: var(--color-background-secondary);
        }
      }

      &__empty {
        display: flex;
        min-height: 56px;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        color: var(--color-text-secondary);
        font-size: 16px;
        line-height: 56px;
        text-align: center;
      }
    }

    &__favourites {
      border-bottom: 2.5px solid #e2e2e6;
      background-color: var(--color-white);
    }
  }
</style>
