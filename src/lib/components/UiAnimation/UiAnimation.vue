<script lang="ts" setup>
  import { ref } from "vue";
  import { Vue3Lottie } from "vue3-lottie";

  import { UiAnimationProps } from "./types";

  withDefaults(defineProps<UiAnimationProps>(), {
    autoPlay: false,
    loop: false
  });
  defineEmits(["onAnimationLoaded", "onLoopComplete", "onOnComplete"]);

  const lottieRef = ref<InstanceType<typeof Vue3Lottie>>();

  defineExpose({
    lottie: lottieRef
  });
</script>
<template>
  <Vue3Lottie
    class="ui-animation"
    ref="lottieRef"
    :autoPlay="autoPlay"
    :loop="loop"
    :animationData="iconComponent"
    @onAnimationLoaded="$emit('onAnimationLoaded')"
    @onLoopComplete="$emit('onLoopComplete')"
    @onOnComplete="$emit('onOnComplete')"
  />
</template>
