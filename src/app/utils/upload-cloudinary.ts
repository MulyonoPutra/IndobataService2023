import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export const uploadCloudinary = async (filePath: string, folder: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'auto',
  });
};

export const multipleUpload = async (filePaths: string[], folder: string) => {
  return await Promise.all(
    filePaths.map((filePath) =>
      cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'auto',
      })
    )
  );
};
