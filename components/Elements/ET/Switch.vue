<template>
  <v-switch
    v-model="switchValue"
    :class="combinedClasses"
    v-bind="element.properties"
  ></v-switch>
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

const switchValue = ref(false);
</script>

<style></style>
