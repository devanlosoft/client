<template>
  <v-card variant="text">
    <v-row>
      <v-col cols="12">
        <ElementsETTemplate :element="template" />
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
const route = useRoute();
import { useElementStore } from "~/store/element";
const elementStore = useElementStore();
const template = reactive(elementStore.getElement);
</script>
