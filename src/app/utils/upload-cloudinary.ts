import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export const single = async (
	filePath: string,
	folder: string
): Promise<UploadApiResponse> => {
	return await cloudinary.uploader.upload(filePath, {
		folder,
		resource_type: 'auto',
	});
};

export const multiple = async (filePaths: string[], folder: string) => {
	return await Promise.all(
		filePaths.map((filePath) =>
			cloudinary.uploader.upload(filePath, {
				folder,
				resource_type: 'auto',
			})
		)
	);
};

export const fields = async (
	files: {[fieldname: string]: Express.Multer.File[]},
	folder: string
) => {
	const field = Object.keys(files);
	return await Promise.all(
		field.map(async (f) => {
			const uploaded = await Promise.all(
				files[f].map(async (file: { path: string }) => {
					const result = await cloudinary.uploader.upload(file.path, {
						folder,
						resource_type: 'auto',
					});
					return result.secure_url;
				})
			);

			return uploaded.join(', ');
		})
	);
};
