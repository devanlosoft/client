<template>
  <v-data-iterator :items="elements" :items-per-page="itemsPerPage">
    <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
      <h1
        class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
      >
        <div class="text-truncate">Elementos principales de CREAVI</div>

        <div class="d-flex align-center">
          <v-btn class="me-8" variant="text" @click="onClickSeeAll">
            <span class="text-decoration-underline text-none"
              >Ver todos los elementos</span
            >
          </v-btn>

          <div class="d-inline-flex">
            <v-btn
              :disabled="page === 1"
              class="me-2"
              icon="mdi-arrow-left"
              size="small"
              variant="tonal"
              @click="prevPage"
            ></v-btn>

            <v-btn
              :disabled="page === pageCount"
              icon="mdi-arrow-right"
              size="small"
              variant="tonal"
              @click="nextPage"
            ></v-btn>
          </div>
        </div>
      </h1>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
          <v-sheet border>
            <div
              :style="{
                background: `linear-gradient(to top right, rgba(255, 255, 255, .1), ${getRandomColor()})`,
                padding: '16px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
                width: 'auto',
              }"
            >
              <ElementsRender :element="item.raw" />
            </div>

            <v-list-item
              :title="item.raw.name"
              density="comfortable"
              lines="two"
              subtitle="Lorem ipsum dil orei namdie dkaf"
            >
              <template v-slot:title>
                <strong class="text-h6">
                  {{ item.raw.name }}
                </strong>
              </template>
            </v-list-item>

            <v-table class="text-caption" density="compact">
              <tbody>
                <tr
                  align="right"
                  v-for="(value, key, i) in Object.entries(item.raw.properties)"
                  :key="i"
                >
                  <th>{{ value[0] }} :</th>
                  <td>{{ value[1] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ page, pageCount }">
      <v-footer
        class="justify-space-between text-body-2 mt-4"
        color="surface-variant"
      >
        Total Elementos: {{ elements.length }}

        <div>Página {{ page }} de {{ pageCount }}</div>
      </v-footer>
    </template>
  </v-data-iterator>
</template>
<script setup>
import { useElementStore } from "~/store/element";

const elementStore = useElementStore();
const selectedElement = ref(null);

const elements = ref([]);
const itemsPerPage = 4;

watch(
  () => selectedElement.value,
  async (newValue) => {
    if (newValue) {
      (await elementStore.setDefaultElementById(newValue._id)) || {};
    }
  }
);

const onClickSeeAll = () => {
  itemsPerPage.value = itemsPerPage.value === 4 ? elements.value.length : 4;
};

const formatKey = (key) => {
  // Opcionalmente, formatea la clave para que sea más legible
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(
    color.substring(3, 5),
    16
  )}, ${parseInt(color.substring(5, 7), 16)}, 0.15)`;
};

onMounted(async () => {
  try {
    elements.value = elementStore.getElements;
  } catch (error) {
    console.error("Error fetching elements:", error);
  }
});
</script>
