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

const conString = process.env.DATABASE_URL || `postgres://scvlhsdaqhptbv:fbb65a15f3d5d4c7b53c06b65265048b50cfea54576de8b5d277eed652eb579f@ec2-54-210-128-153.compute-1.amazonaws.com:5432/d7jco0gjqdi1kj?ssl=true`;
const db = pgp(conString);

export const initiateDb = () => {
    return db.any(`DROP table sharda_gallery; create table sharda_gallery (
        id SERIAL PRIMARY KEY,
        title text, 
        description text,
        contributor text,
        isactive boolean,
        publicUrl text
    )`).then(data => {
        return data
    })
}

export const viewGallery = () => {
    return db.any(`select * from sharda_gallery`).then(data => {
        return data
    })
}

export const insertImageEntry = ({ title, description, contributor, isactive, publicUrl }) => {
    return db.any('insert into sharda_gallery(title, description, contributor, isactive, publicUrl) values ($1, $2, $3, $4, $5)', [title, description, contributor, isactive, publicUrl]).then(data => {
        return data
    })
}

export default db;