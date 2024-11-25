<template>
  <v-row dense>
    <v-col cols="12" class="pa-1">
      <v-card
        :class="combinedClasses"
        :prepend-icon="element.properties.icon"
        :title="element.properties.title"
      >
        <v-card-text>{{ element.properties.description }}</v-card-text>
        <v-btn color="primary" @click="updateTemplate">Guardar</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" class="pa-1">
      <v-card variant="outlined" class="ma-2" color="grey-lighten-2">
        <MenuEditorElements @onAddElement="addElement" class="ma-0" />
      </v-card>
    </v-col>
    <v-col cols="12" class="pa-1">
      <v-card>
        <ElementsETPage :element="elementTmp" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useElementStore } from "~/store/element";
const route = useRoute();

const elementStore = useElementStore();
const id = ref(route.params.id);

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

const elementTmp = reactive(props.element);

const addElement = (element) => {
  elementStore.setCurrentElement(props.element);
  elementStore.addElementToTemplate(id.value, element);
};

const updateTemplate = async () => {
  let result = await elementStore.updateTemplate(id.value, elementTmp);
  if (result) {
    elementTmp.structure = result.structure;
  }
};

const combinedClasses = computed(() => {
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});
</script>
