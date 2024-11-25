<template>
  <div :class="combinedClasses">
    <v-icon v-if="element.properties.icon" size="x-small">
      {{ element.properties.icon }}
    </v-icon>
    {{ element.properties.label }}
  </div>
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
