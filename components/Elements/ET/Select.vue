<template>
  <v-select v-bind="element.properties" :class="combinedClasses"></v-select>
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

<style scoped></style>
