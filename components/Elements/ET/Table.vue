<template>
  <v-data-table
    :class="combinedClasses"
    v-bind="element.properties"
  ></v-data-table>
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
