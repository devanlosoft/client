import { defineStore } from "pinia";

interface State {
  drawer: boolean;
  showProperties: boolean;
  PanelButtons: boolean;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): State => ({
    drawer: false,
    showProperties: false,
    PanelButtons: false,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getDrawer: (state) => state.drawer,
    getShowProperties: (state) => state.showProperties,
    getPanelButtons: (state) => state.PanelButtons,
  },
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    hideDrawer() {
      this.drawer = false;
    },
    toggleShowProperties() {
      this.showProperties = !this.showProperties;
    },
    setStatusProperties(value: boolean) {
      this.showProperties = value;
    },
    setShowProperties() {
      this.showProperties = true;
    },
    hideProperties() {
      this.showProperties = false;
    },
    openProperties() {
      this.showProperties = true;
    },
    showPanelButtons() {
      this.PanelButtons = true;
    },
    hidePanelButtons() {
      this.PanelButtons = false;
    },
  },
});
