<template>
  <v-list v-bind="element.properties" :class="combinedClasses"></v-list>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

const combinedClasses = computed(() => {
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});
</script>

<style></style>
