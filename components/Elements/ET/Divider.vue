<template>
  <div class="d-block pa-2 d-lg-flex mx-auto" style="width: 100%">
    <v-divider
      :class="combinedClasses"
      :v-bind="element.properties"
    ></v-divider>
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
