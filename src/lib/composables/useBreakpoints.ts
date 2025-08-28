import { onBeforeMount, onBeforeUnmount, onMounted,ref } from "vue";

export function useBreakpoints() {
  const isDesktop = ref(false);
  const isTablet = ref(false);
  const isMobile = ref(false);
  function resize(e: Event) {
    const target = e.currentTarget as Window;
    isDesktop.value = target.innerWidth < 1200;
    isTablet.value = target.innerWidth < 1024 && target.innerWidth >= 769;
    isMobile.value = target.innerWidth < 769;
  }
  onMounted(() => {
    isDesktop.value = window.innerWidth < 1200;
    isTablet.value = window.innerWidth < 1024 && window.innerWidth >= 769;
    isMobile.value = window.innerWidth < 769;
  });
  onBeforeMount(() => {
    window.addEventListener("resize", resize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
  });

  return { isTablet, isMobile, isDesktop };
}
