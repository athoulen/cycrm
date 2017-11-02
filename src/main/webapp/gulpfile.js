var gulp = require("gulp");
//--以下为gulp中的插件方法 需下载，npm install gulp-"名称" --save-dev
var minifyCSS = require("gulp-minify-css");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var sourcemaps = require('gulp-sourcemaps');
var proxy = require('http-proxy-middleware');
//方法写完后，在dos中运行以下  gulp "自定义的任务名称"
gulp.task("sass",function(){
	gulp.src(["template/*/*.scss","template/*/*/*.scss"])
		.pipe(sass())
		.pipe(concat("style.css"))
		//.pipe(minifyCSS())
		.pipe(gulp.dest("dist/css"));
	gulp.src("index.html")
		.pipe(connect.reload());
})
gulp.task('css',function(){
	gulp.src(["css/*.css","css/*.map"])
		.pipe(gulp.dest('dist/css'));
})
gulp.task("script",function(){
	gulp.src(['template/*/*.js','template/*/*/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat("index.js"))
		//.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/js"));
	gulp.src("index.html")
		.pipe(connect.reload());
	
})
gulp.task("images",function(){
	gulp.src("img/*.*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/img"))
})
gulp.task("move",function(){
	gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload())
})
gulp.task("template",function(){
	gulp.src(["template/*/*.html","template/*/*/*.html"])
	.pipe(gulp.dest("dist/views"))
	.pipe(connect.reload())
})
gulp.task("jsmove",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
})

gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true,
		port:8010,
	    middleware: function(connect, opt) {
            return [
                proxy('/cycrm/',{
                    //target: 'http://hy.tunnel.qydev.com',
                    //target:'http://192.168.92.12:28074',
                    //target:'http://192.168.91.157:28074',
                    target:'http://192.168.92.72:8080',
                    //target:'http://ykf.tunnel.qydev.com',
                   // target:'http://192.168.100.147:30102',
                    changeOrigin: true,
                })
            ]
        }
	});
});
gulp.task("watch",function(){
	gulp.watch(['index.html'], ['move']);
	gulp.watch(["template/*/*.html","template/*/*/*.html"],["template"]);
	gulp.watch(["template/*/*.scss","template/*/*/*.scss"],["sass"]);
	gulp.watch(["template/*/*.js","template/*/*/*.js"],["script"]);
	gulp.watch(["img/*.*"],["images"]);
})
gulp.task("default",['css',"template","sass","images","jsmove","watch",'server']);