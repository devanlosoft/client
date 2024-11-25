<template>
  <v-icon v-bind="element.properties" :class="combinedClasses">
    <span v-if="element.properties.text">{{ element.properties.text }}</span>
  </v-icon>
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
