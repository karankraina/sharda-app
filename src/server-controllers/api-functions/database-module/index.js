const pgoptions = {
    connect(client, dc, isFresh) {
        if (isFresh) {
            client.on('notice', (msg) => {
                console.log('notice: ', msg);
            });
        }
    },
    query(e) {
        console.log(e.query);
    },
};
const pgp = require('pg-promise')(pgoptions);

const conString = process.env.DATABASE_URL || 'postgres://scvlhsdaqhptbv:fbb65a15f3d5d4c7b53c06b65265048b50cfea54576de8b5d277eed652eb579f@ec2-54-210-128-153.compute-1.amazonaws.com:5432/d7jco0gjqdi1kj?ssl=true';
const db = pgp(conString);

export default {
    initiateDb: () => {
        return db.any(`DROP table sharda_gallery; create table sharda_gallery (
            id SERIAL PRIMARY KEY,
            title text, 
            description text,
            contributor text,
            isactive boolean,
            publicUrl text
        )`).then((data) => {
            return data;
        });
    },
    viewGallery: (isAdmin) => { return db.any('select * from sharda_gallery where ($1 = true OR isactive = true) order by 1 desc', isAdmin); },
    insertImageEntry: (imageData) => {
        const {
            title, description, contributor, isactive, publicUrl,
        } = imageData;
        return db.any('insert into sharda_gallery(title, description, contributor, isactive, publicUrl) values ($1, $2, $3, $4, $5)', [title, description, contributor, isactive, publicUrl]);
    },
    toggleImageStatus: (imageId) => { return db.any('update sharda_gallery set isactive= NOT isactive where id = $1', imageId); },
    getLessonData: (id) => { return db.any('select lessondata from sharda_lessons_android where id=$1', id).then(([{ lessondata }]) => { return lessondata; }); },
    getImageById: (imageId) => { return db.any('select id, title, imagedata from sharda_gallery where id = $1', [imageId]); },
};
