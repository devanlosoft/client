<template>
  <v-text-field :class="combinedClasses" v-bind="element.properties">
  </v-text-field>
</template>

<script setup>
// se importan las referencia reactivas y computadas
import { ref, computed } from "vue";
// son los datos que se recolectan de un formualrio
const data = ref("");
// existe una sola props que es el elemento que se va a renderizar y esta contiene las demas propiedades
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
// en class se recibe un array se transforma a string
const combinedClasses = computed(() => {
  // computed se utiliza para transformar los datos que se reciben
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});
</script>

<style></style>
