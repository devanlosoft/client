<template>
  <div class="btn-editor" variant="outlined" color="grey-lighten-2">
    <v-btn
      color="grey-lighten-2"
      icon
      class="elevation-0 rounded-lg ma-1 pa-1"
      size="x-small"
      variant="outlined"
      @click.stop="updatePropertiesOnElementPanel"
    >
      <v-icon color="amber-darken-1">mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      color="grey-lighten-2"
      icon
      class="elevation-0 rounded-lg ma-1 pa-1"
      size="x-small"
      variant="outlined"
      @click.stop="saveChanges"
    >
      <v-icon color="green-darken-1">mdi-content-save</v-icon>
    </v-btn>
    <v-btn
      color="grey-lighten-2"
      icon
      class="elevation-0 rounded-lg ma-1 pa-1"
      size="x-small"
      variant="outlined"
      @click.stop="deleteElement"
    >
      <v-icon color="red-darken-1">mdi-delete </v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn
      color="grey-lighten-2"
      icon
      class="elevation-0 rounded-lg ma-1 pa-1"
      size="x-small"
      variant="outlined"
      @click.stop="moveElementUp"
    >
      <v-icon color="yellow-darken-1">mdi-arrow-up-bold</v-icon>
    </v-btn>
    <v-btn
      color="grey-lighten-2"
      icon
      class="elevation-0 rounded-lg ma-1 pa-1"
      size="x-small"
      variant="outlined"
      @click.stop="moveElementDown"
    >
      <v-icon color="yellow-darken-1">mdi-arrow-down-bold</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { useElementStore } from "~/store/element";
import { useAppStore } from "~/store/app";
import { usePropertiePanelStore } from "~/store/propertiePanel";

const elementStore = useElementStore();
const appStore = useAppStore();
const appPropertiePannel = usePropertiePanelStore();

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  parent: {
    type: Object,
    default: null,
  },
});

const updatePropertiesOnElementPanel = async () => {
  // obtener el elemento actual
  await elementStore.setCurrentElement(props.element);
  appStore.openProperties();
};

const deleteElement = async () => {
  await elementStore.deleteElementTemp(props.element._id, props.parent._id);
};

const saveChanges = async () => {
  // debe almacenar en el state el objeto actual
  await appStore.openProperties();
};

const moveElementUp = async () => {
  await elementStore.moveElementUpTemp(props.element._id, props.parent._id);
};

const moveElementDown = async () => {
  await elementStore.moveElementDownTemp(props.element._id, props.parent._id);
};
</script>

<style>
.btn-editor {
  position: absolute;
  top: 2px;
  right: 5px;
  transform: translateY(-50%);
  opacity: 0.8;
  transition: opacity 0.3s;
  background-color: transparent;
  transition: background-color 0.3s;
  border-radius: 10px;
}

.btn-editor:hover {
  background-color: white;
  opacity: 1;
}
</style>
