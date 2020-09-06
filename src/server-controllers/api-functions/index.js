import dbModule from './database-module';
import { uploadImage } from './contentful-module';

const fetchLinks = () => Promise.resolve([
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
])

export default {
    uploadImage,
    ...dbModule,
    fetchLinks

};
