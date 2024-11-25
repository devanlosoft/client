<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-speed-dial location="top bottom" transition="scale-transition">
          <template v-slot:activator="{ props: activatorProps }">
            <v-fab
              v-bind="activatorProps"
              size="large"
              icon="$plus"
              color="primary"
              @click.stop="openDialog"
            >
            </v-fab>
            <v-tooltip activator="parent" location="start"
              >Nueva plantilla</v-tooltip
            >
          </template>
        </v-speed-dial>
      </template>

      <v-card
        prepend-icon="mdi-application-settings-outline"
        title="Nueva Plantilla"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="* Título"
                required
                density="compact"
                v-model="newTemplate.properties.title"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                variant="outlined"
                label="* Descripción"
                density="compact"
                v-model="newTemplate.properties.description"
              ></v-textarea>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">
            * Campos son obligatorios
          </small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancelar"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Guardar"
            variant="tonal"
            @click.stop="saveNewTemplate"
          ></v-btn>
        </v-card-actions>
        {{ newTemplate }}
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import { useElementStore } from "~/store/element";
const elementStore = useElementStore();
//const element = computed(() => elementStore.getElement);

const dialog = ref(false);
const newTemplate = ref({
  name: "c-template-",
  version: "1.0.0",
  type: "template",
  data: {},
  structure: [],
  createdBy: "inspiraller",
  trunk: "main",
  versions: "",
  category: "template",
  properties: {
    icon: "mdi-application-settings-outline",
    title: "",
    variant: "outlined",
    disabled: false,
    density: "compact",
    title: "",
    description: "",
    color: "",
    class: ["ma-2", "pa-2"],
  },
});

const openDialog = () => {
  newTemplate.value.name = `c-template-${uuidv4()}`;
  dialog.value = true;
};

const saveNewTemplate = async () => {
  try {
    let elementData = JSON.parse(JSON.stringify(newTemplate.value, null, 2));
    console.log("elementData", elementData);
    await elementStore.createElement(elementData);
    dialog.value = false;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
};
</script>
