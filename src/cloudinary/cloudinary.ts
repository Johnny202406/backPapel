// src/cloudinary/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME||'drykytyq3',
  api_key: process.env.CLOUDINARY_KEY||'786113665739989',
  api_secret: process.env.CLOUDINARY_SECRET||'bK6Ap14Ni9pKWFS8FXftySbGPBM',
});

export { cloudinary };
