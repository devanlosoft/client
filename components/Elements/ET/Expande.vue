<template>
  <v-expansion-panels :class="combinedClasses" v-model="panel">
    <v-expansion-panel
      v-for="(title, i) in element.properties.titles"
      :key="i"
      :text="element.properties.values[i]"
      :title="title"
    >
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const panel = ref([]);
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
