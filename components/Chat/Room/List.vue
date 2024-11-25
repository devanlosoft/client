<template>
  <v-container>
    <v-card class="mx-auto pa-2 ma-2" :variant="variant">
      <v-card-text>
        <v-list>
          <v-list-item
            :prepend-avatar="userChat.avatar"
            :title="userChat.name"
            :subtitle="userChat.email"
          >
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions v-if="!loadding">
        <v-text-field
          v-model="newRoom.name"
          density="compact"
          :variant="variant"
          :label="label"
          append-inner-icon="mdi-plus-circle"
          single-line
          hide-details
          @click:append-inner="createRoom"
          @keyup.enter="createRoom"
        ></v-text-field>
      </v-card-actions>

      <v-divider></v-divider>
      <v-list v-if="!loadding">
        <v-list-subheader>{{ title }}</v-list-subheader>
        <v-infinite-scroll height="300" @load="load" side="end">
          <v-list-item
            v-for="(item, i) in items"
            :key="item.ownerId"
            :item-title="item.name"
            :item-value="item.ownerId"
            :color="color"
            :rounded="rounded"
            @click="setRoom(item.ownerId)"
            scrollable
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-infinite-scroll>
      </v-list>
      <v-skeleton-loader
        v-else-if="loadding"
        class="mx-auto border"
        max-width="300"
        type="text, list-item-avatar-three-line"
      ></v-skeleton-loader>
    </v-card>
    {{ rooms }}
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
const { $io, $getStatusConnection, $socketStore } = useNuxtApp();

const newRoom = ref({
  ownerId: "",
  name: "",
  description: "",
});

const idConnection = ref();
const isConnected = ref(false);
const items = ref([]);
const rooms = reactive([]);
const userChat = ref({});
const loadding = ref(false);

onMounted(() => {
  isConnected.value = $getStatusConnection().connected;

  if ($socketStore) {
    userChat.value = ref($socketStore.getUserChat);
  }
  
  loadding.value = true; // Comienza el estado de carga
  $io.emit("listRooms");

  // Escuchar una vez al evento para evitar duplicación
  $io.once("onListRooms", (result) => {
    rooms.value = result.rooms;
    items.value = rooms.value.map((room) => ({
      _id: room._id,
      ownerId: room.ownerId,
      name: room.name,
      icon: "mdi-message",
      lengthMessages: 0,
      total: 0,
      page: 1,
      pageSize: 10,
      messages: "",
    }));

    $socketStore.setRooms(items.value);
    loadding.value = false; // Termina el estado de carga
  });
});

onUnmounted(() => {
  $io.off("onListRooms");
  $io.off("onRoomCreate");
});

const load = async ({ done }) => {
  if ($socketStore != undefined) {
    console.log("load rooms", rooms.value);
    items.value = rooms.value.map((room) => ({
      _id: room._id,
      ownerId: room.ownerId,
      name: room.name,
      icon: "mdi-message",
      lengthMessages: 0,
      total: 0,
      page: 1,
      pageSize: 10,
      messages: "",
    }));

    $socketStore.setRooms(items.value);
    done("empty"); // Llamado cuando termina la carga
  }
};

const createRoom = () => {
  newRoom.value.ownerId = Math.random().toString(36).substr(2, 9);

  $io.emit("newRoom", newRoom.value);

  $io.once("onRoomCreate", () => {
    $io.emit("listRooms");  // Refrescar lista de rooms
    newRoom.value = {};     // Resetear el input
  });
};

const setRoom = (ownerId) => {
  $socketStore.selectRoom(ownerId);
};

const props = defineProps({
  icon: {
    type: String,
    default: "mdi-account",
  },
  title: {
    type: String,
    default: "Salas",
  },
  color: {
    type: String,
    default: "#42A5F5",
  },
  rounded: {
    type: String,
    default: "shaped",
  },
  label: {
    type: String,
    default: "Nombre para nueva sala",
  },
  variant: {
    type: String,
    default: "outlined",
  },
});
</script>
