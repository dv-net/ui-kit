<script setup lang="ts">
  import { UiBlockTitle } from "@/lib";
  const links = [
    { path: "/test1", title: "About us page" },
    { path: "/test2", title: "Services page" },
    { path: "/test3", title: "Contact page" }
  ];
</script>

<template>
  <UiBlockTitle title="Title" :links="links" />
  <RouterView />
</template>
