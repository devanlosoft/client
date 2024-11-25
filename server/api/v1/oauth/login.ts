import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const credentials = await readBody(event);

  const apiBaseUrl = process.env.API_BASE_URL;
  const apiVersion = process.env.API_VERSION;

  try {
    const response = await fetch(`http://localhost:4000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Error fetching OAuth token URL: ${response.statusText}`);
      
    }

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching OAuth token URL:", error);
    return { error };
  }
});
