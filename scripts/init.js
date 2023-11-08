'use strict';

const fs = require('fs');
const upath = require('upath');

['dist', 'dist/css', 'dist/js'].forEach((dir) => {
    console.log(`Creating ${dir}...`);
    fs.mkdir(dir, {recursive: true}, (err) => {
        if (err) {
            return console.error(err);
        }
    });
});


[
    {
        target: 'src/assets',
        link: 'dist/assets'
    }
].forEach((link) => {
    console.log(`Linking ${link.link} to ${link.target}...`);
    const absFrom = upath.resolve(__dirname, `../${link.target}`);
    const absTo = upath.resolve(__dirname, `../${link.link}`);
    fs.symlink(absFrom, absTo, 'junction', (err) => {
        if (!err) console.log(`failed ${err}`)
    });
});