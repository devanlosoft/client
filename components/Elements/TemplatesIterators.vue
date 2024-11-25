<template>
  <v-data-iterator :items="templates" item-value="name">
    <template v-slot:default="{ items, isExpanded, toggleExpand }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw._id"
          cols="12"
          md="4"
          sm="12"
        >
          <v-card border flat>
            <v-card-title class="d-flex align-center">
              <v-icon
                :color="item.raw.properties.color"
                :icon="item.raw.properties.icon"
                size="18"
                start
              ></v-icon>

              <div class="text-h6 text-truncate" style="max-width: 170px">
                {{ item.raw.properties.title }}
              </div>
            </v-card-title>

            <v-card-text>
              <div class="text-body-2 text-truncate" style="max-width: 300px">
                {{ item.raw.properties.description }}
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn border @click.stop="selectTemplate(item.raw._id)"
                >Usar esta plantilla</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useElementStore } from "~/store/element";
import { useRoute, useRouter } from "vue-router";

const elementStore = useElementStore();
const router = useRouter();

const templates = ref(elementStore.getTemplates);

const selectTemplate = async (id) => {
  await elementStore.findTemplateById(id);
  router.push(`/templates/editor/${id}`);
};

/*watch(
  () => elementStore.elements,
  (value) => {
    templates.value = elementStore.getTemplates();
  }
);*/

onMounted(async () => {
  try {
    //! se debe cargar una sola vez en el sistema
    await elementStore.fetchElements();
    await elementStore.fetchElementsTemplates();
    // templates.value = elementStore.getTemplates();
  } catch (error) {
    console.error("Error fetching elements:", error);
  }
});
</script>
