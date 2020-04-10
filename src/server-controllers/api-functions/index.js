import { db, viewGallery } from './database-module';
import { uploadImage } from './contentful-module';

export const getAllGalleryPosts = () => {
    return viewGallery().then(posts => {
        return posts
    })
}

export default {
    databaseClient: db,
    uploadImage
}