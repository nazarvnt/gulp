const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
var cleanss = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');


const paths = {
    "root": "./dist",
    "html": {
        "watch": "./source/views/**/*.pug",
        "source": "./source/views/pages/*.pug",
        "dest": "./dist" 
    },
    "assets" : {
        "images" : {
            "watch": "./source/assets/images/*",
            "source": "./source/assets/images/*",
            "dest": "./dist/images"
        }
    },
    "css" : {
        "watch": "./source/assets/styles/*.sass",
        "source": "./source/assets/styles/*.sass",
        "dest": "./dist/css"
    }

}
function cssBuild(){
    return gulp.src(paths.css.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanss({keepBreaks: false}))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream())
}
function htmlBuild ()  { 
    return gulp.src(paths.html.source)
        .pipe(
            pug(
                {
                    "pretty" : true
                }
            ))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}
function assets ()  {
    return gulp.src(paths.assets.images.source)
        .pipe(gulp.dest(paths.assets.images.dest))
}
function watch()    {
    browserSync.init({
        "server" : {
            baseDir : paths.root
        }
    })
    gulp.watch(paths.html.watch, htmlBuild)
    gulp.watch(paths.css.watch, cssBuild)
}

exports.css = cssBuild;
exports.assets = assets;
exports.watch = watch;
exports.pages = htmlBuild; 