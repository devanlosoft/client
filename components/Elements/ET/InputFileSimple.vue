<template>
  <v-row>
    <v-col cols="9">
      <v-file-input
        v-model="selectedFile"
        v-bind="element.properties"
        :class="combinedClasses"
        :hint="urlFile"
      ></v-file-input>
      <a :href="urlFile" ass="text-caption ma-1 pa-1" target="_blank">
        {{ urlFile ? "Abrir archivo" : "No hay archivos seleccionados" }}
      </a>
    </v-col>
    <v-col cols="3">
      <v-btn
        @click="handleFileUpload"
        :color="element.properties.color"
        class="ma-4"
      >
        <v-icon>mdi-cloud-upload-outline</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script setup>
const selectedFile = ref(null);
const urlFile = ref(null);

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

const handleFileUpload = async () => {
  if (!selectedFile.value) {
    console.warn("No file selected!");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);
  formData.append("isPublic", true);

  try {
    const response = await fetch("http://localhost:4000/api/v1/dms/file", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading file");
    }

    const result = await response.json();
    urlFile.value = result.url;
    selectedFile.value = null;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

const combinedClasses = computed(() => {
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});
</script>
