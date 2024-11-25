<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(category, index) in categories"
        :key="category.name"
        cols="12"
        md="6"
        class="d-flex flex-column align-center pa-0"
      >
        <!--p class="text-caption pl-3">{{ category.label }}</p-->
        <v-btn-toggle
          divided
          variant="outlined"
          height="auto"
          flat="true"
          v-model="toggles[index]"
          color="primary"
          class="ma-0"
        >
          <v-btn
            density="compact"
            size="small"
            v-for="(e, i) in getElementsByCategory(category.name)"
            :key="e._id"
            @click.stop="addElement(category.name, toggles[index])"
          >
            <v-icon>{{ e.properties.icon }}</v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ e.label }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useElementStore } from "~/store/element";

const categories = ref([
  { name: "content", label: "Contenido" },
  { name: "form", label: "Formulario" },
]);

const elementStore = useElementStore();
const emit = defineEmits(["onAddElement"]);

const toggles = ref(categories.value.map(() => null));

const elements = ref(elementStore.getElements);

const getElementsByCategory = (category) => {
  return elements.value.filter((e) => e.category === category);
};

const addElement = (category, toggleValue) => {
  const selectedElements = getElementsByCategory(category);
  emit("onAddElement", selectedElements[toggleValue]);
};
</script>
