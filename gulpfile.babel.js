import gulp from 'gulp';
import minifyhtml from 'gulp-minify-html';
import del from 'del';
import ws from 'gulp-webserver';
import gimage from 'gulp-image';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import ghPages from 'gulp-gh-pages';

sass.compiler = require("node-sass");

const routes = {
  html: {
    watch: "src/**/*.html",
    src: "src/*.html",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/**/*.js",
    dest: "build/js",
  }
};

const html = () => gulp
  .src(routes.html.src)
  .pipe(minifyhtml())
  .pipe(gulp.dest(routes.html.dest));

const clean = () => del(["build", ".publish"]);

const webserver = () => gulp
  .src("build")
  .pipe(ws({ livereload: true, open: true }));

const img = () => gulp
  .src(routes.img.src)
  .pipe(gimage())
  .pipe(gulp.dest(routes.img.dest));

const styles = () => gulp
  .src(routes.scss.src)
  .pipe(sass().on("error", sass.logError))
  .pipe(
    autoprefixer({
      browsers: ["last 2 versions"]
    })
  )
  .pipe(minifyCSS())
  .pipe(gulp.dest(routes.scss.dest));

const js = () => gulp
  .src(routes.js.src)
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ['@babel/preset-env'] }),
      ['uglifyify', { global: true }]
    ]
  })
  )
  .pipe(gulp.dest(routes.js.dest));

const ghDeploy = () => gulp
  .src("build/**/*")
  .pipe(ghPages());

const watch = () => {
  gulp.watch(routes.html.watch, html); // 2번째 인자는 어떤 작업을 수행할 것인지
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([html, styles, js]);

const live = gulp.parallel([webserver, watch]); // parallel : 동시에 작업을 수행하고 싶을 떄

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, ghDeploy])