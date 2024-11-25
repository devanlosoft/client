import { defineStore } from "pinia";
import { useElement } from "~/composable/elements/useElement";

const {
  element,
  elements,
  getElement,
  getElements,
  getElementsTemplates,
  createElement,
  updateElement,
  deleteElement,
  getElementByName,
} = useElement();

interface Element {
  _id: string;
  keywords: string;
  structure: Element[];
  team: string;
  version: string;
  name: string;
  type: string;
  label: string;
  functions: string;
  description: string;
  properties: Record<string, any>;
  category: string;
}

export const useElementStore = defineStore("element", {
  state: () => {
    return {
      elements: [] as Element[],
      element: null as Element | null,
      isLoading: false,
      error: null,
    };
  },
  persist: true,
  getters: {
    getElement: (state) => state.element || {},
    getElements: (state) => state.elements,
    getTemplates: (state) =>
      state.elements.filter((element) => element.category === "template"),
  },
  actions: {
    // CRUD Elements state
    async createElement(e: Element) {
      try {
        this.isLoading = true;

        const authorizationString = localStorage.getItem("auth") as any;
        const token = authorizationString
          ? JSON.parse(authorizationString).token
          : null;
        // call API server path /api/v1/elements/create
        const response = await fetch("/api/v1/elements/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(e),
        });

        if (!response.ok) throw new Error("Error creating element");

        const data = await response.json();

        this.element = data;
        this.elements.push(data);
        this.isLoading = false;
      } catch (error) {
        this.error = error as any;
        console.error("Error creating element:", error);
      }
    },

    async fetchElementByName(name: string) {
      const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
      await getElementByName(name, API_BASE_URL);
      this.element = element.value;
    },
    async fetchElements() {
      try {
        const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
        const API_VERSION = useRuntimeConfig().public.API_VERSION;

        await getElements({ API_BASE_URL, API_VERSION });

        this.elements = elements.value;
        this.element = elements.value[0] || null;
      } catch (error) {
        console.error("Error fetching elements:", error);
        this.elements = [];
        this.element = null;
      }
    },
    async fetchElementsTemplates() {
      try {
        const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
        const API_VERSION = useRuntimeConfig().public.API_VERSION;

        await getElementsTemplates({ API_BASE_URL, API_VERSION });
        this.elements = elements.value;
      } catch (error) {
        console.error("Error fetching elements:", error);
        this.elements = [];
        this.element = null;
      }
    },
    async findTemplateById(id: string) {
      const tmp = await this.elements.find((element) => element._id === id);
      this.element = tmp || null;
    },

    async updateElement(element: Element) {
      this.element = element;
      this.elements = this.elements.map((el) =>
        el._id === element._id ? element : el
      );
      console.log("element store", element);
      const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
      const API_VERSION = useRuntimeConfig().public.API_VERSION;
      await updateElement(element, API_BASE_URL, API_VERSION);
    },
    addElementToTemplate(idTemplate: string, element: Element) {
      if (this.element?._id === idTemplate) {
        this.element.structure = [...this.element.structure, element];
      }
    },
    async updateTemplate(id: string, template: Element) {
      const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
      const API_VERSION = useRuntimeConfig().public.API_VERSION;
      await updateElement(template, API_BASE_URL, API_VERSION);
      this.fetchElementsTemplates();
    },
    addElement(element: Element) {
      this.elements.push(element);
    },
    setCurrentElement(element: Element) {
      this.element = element;
    },
    setDefaultElementById(id: string) {
      const element = this.elements.find((element) => element._id === id);
      this.element = element || null;
    },
    deleteElementTemp(id: string, parentId: string) {
      let parent = this.elements.find((element) => element._id === parentId);

      if (parent && parent.structure) {
        let index = parent.structure.findIndex(
          (element: { _id: string }) => element._id === id
        );
        if (index !== -1) {
          parent.structure.splice(index, 1);
        }
      }
    },
    moveElementUpTemp(id: string, parentId: string) {
      let parent = this.elements.find((element) => element._id === parentId);

      if (parent && parent.structure) {
        let index = parent.structure.findIndex(
          (element: { _id: string }) => element._id === id
        );
        if (index > 0) {
          const temp = parent.structure[index - 1];
          parent.structure[index - 1] = parent.structure[index];
          parent.structure[index] = temp;
        }
      }
    },
    moveElementDownTemp(id: string, parentId: string) {
      let parent = this.elements.find((element) => element._id === parentId);

      if (parent && parent.structure) {
        let index = parent.structure.findIndex(
          (element: { _id: string }) => element._id === id
        );
        if (index < parent.structure.length - 1) {
          const temp = parent.structure[index + 1];
          parent.structure[index + 1] = parent.structure[index];
          parent.structure[index] = temp;
        }
      }
    },
  },
});
