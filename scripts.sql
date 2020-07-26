DROP table sharda_gallery;

create table sharda_gallery (
    id SERIAL PRIMARY KEY,
    title text, 
    description text,
    contributor text,
    isactive boolean,
    publicUrl text
);

create table sharda_lessons_android (
    id SERIAL PRIMARY KEY,
    title text, 
    description text,
    lessondata text,
    isactive boolean
);

create table sharda_gallery (
    id SERIAL PRIMARY KEY,
    title text, 
    description text,
    contributor text,
    isactive boolean,
    imagedata bytea
);