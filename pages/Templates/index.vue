<template>
  <v-row class="pa-1 ma-1">
    <v-col cols="12">
      <v-row>
        <v-col cols="10">
          <div class="text-h4">Plantillas</div>
          <p class="font-weight-regular">
            Aquí puedes ver las plantillas disponibles para crear tus
            contenidos.
          </p>
        </v-col>
        <v-col cols="2">
          <ElementsTemplatesNew />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <ElementsTemplatesIterators />
    </v-col>
    <v-col cols="12">
      <v-divider class="border-opacity-100"></v-divider>
    </v-col>
    <v-col cols="12">
      <ElementsIterators />
    </v-col>
  </v-row>
</template>
<script setup></script>
