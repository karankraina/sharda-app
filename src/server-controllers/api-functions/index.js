import dbModule from './database-module';
import { uploadImage } from './contentful-module';

export default {
    uploadImage,
    ...dbModule,
};
