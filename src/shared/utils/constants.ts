import dotenv from 'dotenv';
dotenv.config();

export const DATE_FORMAT = 'MMM D, YYYY h:mm A';

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
