import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import dayjs from "dayjs";
import { type ComputedRef, type Ref, ref, shallowRef, watch } from "vue";

const DATE_FNS_LOCALE_PATHS: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  sw: "en-US",
  ar: "ar",
  bn: "bn",
  bg: "bg",
  cs: "cs",
  da: "da",
  nl: "nl",
  et: "et",
  fi: "fi",
  el: "el",
  hi: "hi",
  hu: "hu",
  id: "id",
  ko: "ko",
  lv: "lv",
  lt: "lt",
  nb: "nb",
  pl: "pl",
  pt: "pt",
  ro: "ro",
  sk: "sk",
  sl: "sl",
  sv: "sv",
  tr: "tr",
  vi: "vi",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  ja: "ja",
  ru: "ru",
  uk: "uk"
};

// Static import paths so the bundler can emit proper locale chunks.
const DATE_FNS_LOADERS: Record<string, () => Promise<unknown>> = {
  "en-US": () => import("date-fns/locale/en-US"),
  "zh-CN": () => import("date-fns/locale/zh-CN"),
  ar: () => import("date-fns/locale/ar"),
  bn: () => import("date-fns/locale/bn"),
  bg: () => import("date-fns/locale/bg"),
  cs: () => import("date-fns/locale/cs"),
  da: () => import("date-fns/locale/da"),
  nl: () => import("date-fns/locale/nl"),
  et: () => import("date-fns/locale/et"),
  fi: () => import("date-fns/locale/fi"),
  el: () => import("date-fns/locale/el"),
  hi: () => import("date-fns/locale/hi"),
  hu: () => import("date-fns/locale/hu"),
  id: () => import("date-fns/locale/id"),
  ko: () => import("date-fns/locale/ko"),
  lv: () => import("date-fns/locale/lv"),
  lt: () => import("date-fns/locale/lt"),
  nb: () => import("date-fns/locale/nb"),
  pl: () => import("date-fns/locale/pl"),
  pt: () => import("date-fns/locale/pt"),
  ro: () => import("date-fns/locale/ro"),
  sk: () => import("date-fns/locale/sk"),
  sl: () => import("date-fns/locale/sl"),
  sv: () => import("date-fns/locale/sv"),
  tr: () => import("date-fns/locale/tr"),
  vi: () => import("date-fns/locale/vi"),
  de: () => import("date-fns/locale/de"),
  es: () => import("date-fns/locale/es"),
  fr: () => import("date-fns/locale/fr"),
  it: () => import("date-fns/locale/it"),
  ja: () => import("date-fns/locale/ja"),
  ru: () => import("date-fns/locale/ru"),
  uk: () => import("date-fns/locale/uk")
};

const DAYJS_LOADERS: Record<string, () => Promise<unknown>> = {
  zh: () => import("dayjs/locale/zh.js"),
  ar: () => import("dayjs/locale/ar.js"),
  bn: () => import("dayjs/locale/bn.js"),
  bg: () => import("dayjs/locale/bg.js"),
  cs: () => import("dayjs/locale/cs.js"),
  da: () => import("dayjs/locale/da.js"),
  nl: () => import("dayjs/locale/nl.js"),
  et: () => import("dayjs/locale/et.js"),
  fi: () => import("dayjs/locale/fi.js"),
  el: () => import("dayjs/locale/el.js"),
  hi: () => import("dayjs/locale/hi.js"),
  hu: () => import("dayjs/locale/hu.js"),
  id: () => import("dayjs/locale/id.js"),
  ko: () => import("dayjs/locale/ko.js"),
  lv: () => import("dayjs/locale/lv.js"),
  lt: () => import("dayjs/locale/lt.js"),
  nb: () => import("dayjs/locale/nb.js"),
  pl: () => import("dayjs/locale/pl.js"),
  pt: () => import("dayjs/locale/pt.js"),
  ro: () => import("dayjs/locale/ro.js"),
  sk: () => import("dayjs/locale/sk.js"),
  sl: () => import("dayjs/locale/sl.js"),
  sv: () => import("dayjs/locale/sv.js"),
  tr: () => import("dayjs/locale/tr.js"),
  vi: () => import("dayjs/locale/vi.js"),
  de: () => import("dayjs/locale/de.js"),
  es: () => import("dayjs/locale/es.js"),
  fr: () => import("dayjs/locale/fr.js"),
  it: () => import("dayjs/locale/it.js"),
  ja: () => import("dayjs/locale/ja.js"),
  ru: () => import("dayjs/locale/ru.js"),
  uk: () => import("dayjs/locale/uk.js")
};

const dateFnsLocaleCache = new Map<string, Locale>([
  ["en", enUS],
  ["sw", enUS]
]);
const loadedDayjsLocales = new Set<string>(["en"]);

dayjs.locale("en");

function isSupportedLocale(locale: string) {
  return Boolean(locale && locale in DATE_FNS_LOCALE_PATHS);
}

export function resolveDatePickerLocale(locale: string) {
  if (!locale || locale === "en" || locale === "sw" || !isSupportedLocale(locale)) {
    return "en";
  }

  return locale;
}

function isEnglishLocale(locale: string) {
  return resolveDatePickerLocale(locale) === "en";
}

function resolveDateFnsPath(locale: string) {
  return DATE_FNS_LOCALE_PATHS[locale] ?? DATE_FNS_LOCALE_PATHS.en;
}

function resolveDayjsLocale(locale: string) {
  return resolveDatePickerLocale(locale);
}

export async function loadDateFnsLocale(locale: string): Promise<Locale> {
  const key = locale || "en";
  const cached = dateFnsLocaleCache.get(key);

  if (cached) {
    return cached;
  }

  const path = resolveDateFnsPath(key);
  const loader = DATE_FNS_LOADERS[path] ?? DATE_FNS_LOADERS["en-US"];

  try {
    const loaded = ((await loader()) as { default: Locale }).default;

    dateFnsLocaleCache.set(key, loaded);

    return loaded;
  } catch {
    dateFnsLocaleCache.set(key, enUS);

    return enUS;
  }
}

export async function ensureDayjsLocale(locale: string): Promise<void> {
  const code = resolveDayjsLocale(locale);

  if (loadedDayjsLocales.has(code)) {
    dayjs.locale(code);
    return;
  }

  if (code === "en") {
    dayjs.locale("en");
    loadedDayjsLocales.add("en");
    return;
  }

  const loader = DAYJS_LOADERS[code];

  try {
    if (loader) {
      await loader();
      loadedDayjsLocales.add(code);
      dayjs.locale(code);
      return;
    }

    dayjs.locale("en");
    loadedDayjsLocales.add("en");
  } catch {
    dayjs.locale("en");
    loadedDayjsLocales.add("en");
  }
}

export function useDatePickerLocale(locale: Ref<string> | ComputedRef<string>) {
  const pickerLocale = shallowRef<Locale>(enUS);
  const localeReady = ref(isEnglishLocale(locale.value));

  watch(
    locale,
    async (value) => {
      if (isEnglishLocale(value)) {
        pickerLocale.value = enUS;
        dayjs.locale("en");
        localeReady.value = true;
        return;
      }

      localeReady.value = false;

      try {
        const [dateFnsLocale] = await Promise.all([loadDateFnsLocale(value), ensureDayjsLocale(value)]);

        pickerLocale.value = dateFnsLocale;
      } catch {
        pickerLocale.value = enUS;
        dayjs.locale("en");
      } finally {
        localeReady.value = true;
      }
    },
    { immediate: true }
  );

  return { pickerLocale, localeReady };
}
