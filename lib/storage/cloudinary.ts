import { Platform } from "react-native";
import { File } from "expo-file-system";

type ImageUploadResponse = { public_id: string; secure_url: string };

export const uploadImage = async (uri: string): Promise<ImageUploadResponse> => {
  const form = new FormData();
  form.append("upload_preset", "laundry");

  if (Platform.OS === "web") {
    const response = await fetch(uri);
    form.append("file", await response.blob(), "order-image");
  } else {
    form.append("file", new File(uri));
  }

  const response = await fetch("https://api.cloudinary.com/v1_1/dce9cwtpw/image/upload", {
    method: "POST",
    body: form,
  });
  const result = await response.json();
  if (!response.ok || !result.public_id || !result.secure_url) {
    throw new Error(result.error?.message || "Image upload failed. Please try again.");
  }
  return result;
};
