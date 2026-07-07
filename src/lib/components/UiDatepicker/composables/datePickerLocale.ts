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

const dateFnsLocaleCache = new Map<string, Locale>([
  ["en", enUS],
  ["sw", enUS]
]);
const loadedDayjsLocales = new Set<string>(["en"]);

dayjs.locale("en");

function isEnglishLocale(locale: string) {
  return !locale || locale === "en" || locale === "sw";
}

function resolveDateFnsPath(locale: string) {
  return DATE_FNS_LOCALE_PATHS[locale] ?? DATE_FNS_LOCALE_PATHS.en;
}

function resolveDayjsLocale(locale: string) {
  if (!locale || locale === "en" || locale === "sw") {
    return "en";
  }

  return locale;
}

export async function loadDateFnsLocale(locale: string): Promise<Locale> {
  const key = locale || "en";
  const cached = dateFnsLocaleCache.get(key);

  if (cached) {
    return cached;
  }

  const path = resolveDateFnsPath(key);
  const mod = await import(`date-fns/locale/${path}`);
  const loaded = mod.default as Locale;

  dateFnsLocaleCache.set(key, loaded);

  return loaded;
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

  try {
    await import(`dayjs/locale/${code}.js`);
    loadedDayjsLocales.add(code);
    dayjs.locale(code);
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

      const [dateFnsLocale] = await Promise.all([loadDateFnsLocale(value), ensureDayjsLocale(value)]);

      pickerLocale.value = dateFnsLocale;
      localeReady.value = true;
    },
    { immediate: true }
  );

  return { pickerLocale, localeReady };
}
