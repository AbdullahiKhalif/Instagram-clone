import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const dbURL = process.env.DATABASE_URL;
export const jwtSecret = process.env.JWT_SECRET_KEY;
export const webURL = process.env.WEB_URL;
export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;