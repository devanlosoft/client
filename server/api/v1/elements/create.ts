import { useElement } from "~/composable/elements/useElement";

export default defineEventHandler(async (event) => {
  try {
    const bodyData = await readBody(event);
    // ! se debe hacer un composable para que todas las rutas tengan su token
    const authorizationHeader = event.req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

    // Call the composable
    const { element, createElement } = useElement();
    await createElement(bodyData, token);

    return element;
  } catch (error) {
    console.error("Error fetching OAuth token URL:", error);
    return { error };
  }
});
