<template>
  <v-chip v-bind="element.properties" :class="combinedClasses">
    {{ element.properties.data }}
  </v-chip>
</template>

<script setup>
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
