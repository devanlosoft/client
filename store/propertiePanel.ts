import { defineStore } from "pinia";

interface State {
  elementTemp: any;
}
export const usePropertiePanelStore = defineStore({
  id: "propertiePanel",
  state: (): State => ({
    elementTemp: {},
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getElementTemp: (state) => state.elementTemp,
  },
  actions: {
    setElementTemp(element: any) {
      this.elementTemp = element;
    },
  },
});
