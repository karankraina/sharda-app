/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';
const path = require('path');
const fs = require('fs')
const fsp = require('fs').promises

import { uploadImage } from '../server-controllers/api-functions/contentful-module';
import { initiateDb, viewGallery } from '../server-controllers/api-functions/database-module';
import apiModule from '../server-controllers/api-functions';

const formidable = require('formidable');

const router = express.Router();

router.get('/test1', (req, res) => {
    console.log('in test2');
    initiateDb().then((data) => {
        console.log(data);
        res.send('index');
    });
});


router.get('/test2', (req, res) => {
    console.log('in test2');
    viewGallery().then((data) => {
        console.log(data);
        res.render('gallery', { data });
    });
});

// Gallery Routes
router.get('/get-gallery-posts', (req, res) => {
    const { id } = req.query;
    apiModule.viewGallery(false).then((data) => {
        if (!id) {
            res.status(200).send(data);
        } else {
            const filteredData = data.find(({ id: dbId }) => { return id == dbId; }) || {};
            res.status(200).send(filteredData);
        }
    }).catch((error) => {
        res.status(500).send('error');
    });
});

router.post('/upload-image', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const {
            title, description, contributor, isactive,
        } = fields;
        uploadImage(files, title).then((data) => {
            console.log(data);
            apiModule.insertImageEntry({
                title, description, contributor, isactive, publicUrl: data.publicUrl,
            }).then((data) => {
                console.log('DATABSE ENTRY SUCCESSFUL........', data);
                res.send(data);
            });
        }).catch((error) => {
            console.log(error);
        });
    });
});

router.post('/toggle-image-status', (req, res, next) => {
    const { imageId } = req.body;
    apiModule.toggleImageStatus(imageId).then((galleryImages) => {
        console.log(galleryImages);
        // res.render('upload', { layout: 'learnsharda', data: galleryImages });
        res.status(200).send('success');
    }).catch((error) => {
        res.render('error', error);
    });
});

router.get('/get-lesson-data', (req, res) => {
    const { id } = req.query;
    apiModule.getLessonData(id).then((data) => {
        res.status(200).send({ data });
    }).catch((error) => {
        res.status(500).send('error');
    });
});

router.get('/get-notification-messages', (req, res) => {
    res.status(200).send({
        data: [
            {
                message: 'This is a sample message from the team',
                date: '16 June 2020',
            },
            {
                message: 'Go to the links section to download JULY edition of Maatrika',
                date: '16 June 2020',
            },
            {
                message: 'This is another sample message from the team',
                date: '16 June 2020',
            },
        ]
    });

});

router.get('/get-android-links', (req, res) => {
    res.status(200).send({
        data: [
            {
              linkText: "Karan's GitHub App",
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Matrika June Edition',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Link to Document 1',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Link to Document 2',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Android Keyboard Link',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: "Karan's GitHub App",
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Matrika June Edition',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Link to Document 1',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Link to Document 2',
              linkUrl: 'https://karankraina.github.io/',
            },
            {
              linkText: 'Android Keyboard Link',
              linkUrl: 'https://karankraina.github.io/',
            },
          ]
    });

});
// Gallery Module
router.get('/images', (req, res) => {
    const { id } = req.query;
    apiModule.viewGallery(false).then((data) => {
        if (!id) {
            res.status(200).send(data);
        } else {
            const filteredData = data.find(({ id: dbId }) => { return id == dbId; }) || {};
            res.status(200).send(filteredData);
        }
    }).catch((error) => {
        res.status(500).send('error');
    });
});

// router.get('/download-image', async (request, response) => {
//     const { id } = request.query;
//     try {
//         const dbData = await apiModule.getImageById(id);
//         const { imagedata: fileData, title: fileName } = dbData[0];
//         const dirPath = process.env.DIR_PATH || '../../downloads';
//         const filePath = path.join(__dirname, dirPath, fileName);
//         await fsp.writeFile(filePath, fileData);
//         response.setHeader('Content-disposition', `attachment; filename=${fileName}`);
//         const filestream = fs.createReadStream(filePath);
//         filestream.pipe(response);
//         filestream.on('end', () => {
//             fs.unlink(filePath, () => {
//                 // file deleted
//                 console.log('File Deleted');
//             });
//         });
//     } catch (error) {
//         response.status(500).send({ error });
//     }
// });


module.exports = router;
