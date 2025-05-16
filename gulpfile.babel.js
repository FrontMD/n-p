"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./frontend/src/views/index.pug",
                "./frontend/src/views/pages/*.pug"
            ],
            dist: "./frontend/dist/",
            watch: [
                "./frontend/src/blocks/**/*.pug",
                "./frontend/src/views/**/*.pug"
            ]
        },
        styles: {
            src: "./frontend/src/styles/main.{scss,sass}",
            dist: "./frontend/dist/styles/",
            watch: [
                "./frontend/src/blocks/**/*.{scss,sass}",
                "./frontend/src/styles/**/*.{scss,sass}"
            ]
        },
        scripts: {
            src: "./frontend/src/js/*.js",
            dist: "./frontend/dist/js/",
            watch: [
                "./frontend/src/blocks/**/*.js",
                "./frontend/src/js/**/*.js"
            ]
        },
        images: {
            src: [
                "./frontend/src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./frontend/src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./frontend/dist/img/",
            watch: "./frontend/src/img/**/*.{jpg,jpeg,png,gif,svg}"
        },
        sprites: {
            src: "./frontend/src/img/svg/*.svg",
            dist: "./frontend/dist/img/sprites/",
            watch: "./frontend/src/img/svg/*.svg"
        },
        fonts: {
            src: "./frontend/src/fonts/**/*.{woff,woff2}",
            dist: "./frontend/dist/fonts/",
            watch: "./frontend/src/fonts/**/*.{woff,woff2}"
        },
        favicons: {
            src: "./frontend/src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
            dist: "./frontend/dist/img/favicons/",
        },
        gzip: {
            src: "./frontend/src/.htaccess",
            dist: "./frontend/dist/"
        }
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "gzip"]));

export default development;