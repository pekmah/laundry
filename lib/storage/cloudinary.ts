import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import {
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: "dce9cwtpw",
  },
});

export const uploadImage = async (file: string) => {
  const options: UploadApiOptions = {
    upload_preset: "laundry",
    unsigned: true,
    resource_type: "auto",
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    // upload the image to cloudinary
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};
