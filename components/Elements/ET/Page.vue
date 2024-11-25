<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-sheet elevation="1" border min-height="100px" min-width="200px">
          <ElementsRender
            v-for="(childElement, i) in element.structure"
            :element="childElement"
            :parent="element"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const props = defineProps({
  element: {
    type: Array,
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
<style scoped>
.fill-height {
  height: 100vh;
}
</style>
