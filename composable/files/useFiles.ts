export function useFiles() {
  const uploadFile = async (formData: FormData) => {
    const response = await fetch("/api/v1/files/upload_file", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading file: ${response.statusText}`);
    }

    return response.json();
  };

  return { uploadFile };
}
