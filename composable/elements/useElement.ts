export function useElement() {
  const apiBaseUrl = process.env.API_BASE_URL;
  const apiVersion = process.env.API_VERSION;
  const pathApi = `${apiBaseUrl}/${apiVersion}`;

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

  const elements = ref<Element[]>([]);
  const element = ref<Element | null>(null);
  // refactorizado
  const createElement = async (e: Element, token: string) => {
    try {
      const result = await fetch(`${pathApi}/elements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(e),
      });

      if (!result.ok) throw new Error("Error creating element");

      const data = await result.json();
      element.value = data;
      elements.value.push(data);
    } catch (error) {
      console.error("Error creating element:", error);
    }
  };

  const getElement = async (id: string, API_BASE_URL: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/elements/${id}`);
      if (!response.ok) throw new Error("Error fetching element");
      const data = await response.json();
      element.value = data;
    } catch (error) {
      console.error("Error fetching element:", error);
      element.value = null;
    }
  };

  const getElements = async (path: {
    API_BASE_URL: string;
    API_VERSION: string;
  }) => {
    try {
      const { API_VERSION, API_BASE_URL } = path;
      const response = await fetch(`${API_BASE_URL}/${API_VERSION}/elements`);
      if (!response.ok) throw new Error("Error fetching elements");
      const data = await response.json();
      elements.value = data;
    } catch (error) {
      console.error("Error fetching elements:", error);
      elements.value = [];
    }
  };

  const getElementsTemplates = async (path: {
    API_BASE_URL: string;
    API_VERSION: string;
  }) => {
    try {
      const { API_VERSION, API_BASE_URL } = path;
      const response = await fetch(
        `${API_BASE_URL}/${API_VERSION}/elements/templates`
      );

      if (!response.ok) throw new Error("Error fetching elements templates");
      const data = await response.json();
      elements.value = [...elements.value, ...data];
    } catch (error) {
      console.error("Error fetching elements templates:", error);
      elements.value = [];
    }
  };

  const updateElement = async (
    element: Element,
    API_BASE_URL: string,
    API_VERSION: string
  ) => {
    try {
      console.log("elemen composable", element);
      const response = await fetch(
        `${API_BASE_URL}/${API_VERSION}/elements/${element._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(element),
        }
      );
      console.log("result element composable", element);
      if (!response.ok) throw new Error("Error updating element");
      const data = await response.json();
      elements.value = elements.value.map((el) =>
        el._id === element._id ? data : el
      );
    } catch (error) {
      console.error("Error updating element:", error);
    }
  };

  const deleteElement = async (id: string, API_BASE_URL: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/elements/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting element");
      elements.value = elements.value.filter((el) => el._id !== id);
    } catch (error) {
      console.error("Error deleting element:", error);
    }
  };

  const getElementByName = async (name: string, API_BASE_URL: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/elements/name/${name}`);
      if (!response.ok) throw new Error("Error fetching element by name");
      const data = await response.json();
      element.value = data;
    } catch (error) {
      console.error("Error fetching element by name:", error);
      element.value = null;
    }
  };

  return {
    element,
    elements,
    getElement,
    getElements,
    getElementsTemplates,
    createElement,
    updateElement,
    deleteElement,
    getElementByName,
  };
}
