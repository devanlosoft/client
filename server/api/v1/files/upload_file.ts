import { defineEventHandler, readBody } from "h3";
import { Buffer } from "buffer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Parse the raw body into FormData if it's not already in that format
  if (body instanceof Buffer) {
    const FormData = require("form-data");
    const form = new FormData();
    form.append("file", body, { filename: "uploaded-file" });

    const file = form.get("file");
    if (!file) {
      throw new Error("No file uploaded or the uploaded data is not a file");
    }

    const fileBlob = new Blob([file], { type: file.type });
    const externalFormData = new FormData();
    externalFormData.append("file", fileBlob, file.name);
    externalFormData.append("isPublic", "true");

    const apiBaseUrl = process.env.API_BASE_URL;
    const apiVersion = process.env.API_VERSION;

    try {
      const response = await fetch(`${apiBaseUrl}/${apiVersion}/dms/file`, {
        method: "POST",
        body: externalFormData,
      });

      if (!response.ok) {
        throw new Error(
          `Error uploading file to external API: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error uploading file to external API:", error);
      throw new Error("Error uploading file");
    }
  } else {
    throw new Error("Invalid form data");
  }
});
