import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

interface CloudinaryConfigs {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
} as CloudinaryConfigs);

const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null | undefined> => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
  }
};

export {uploadOnCloudinary}