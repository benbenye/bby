module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {//压缩文件
                   options: {
                       banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                   },
                   build: {
                       src: [
	                       'public/javascripts/page/collect_page.js',
	                       'public/javascripts/page/confirm_page.js'
	                    ],
                       dest: 'public/javascripts/release/collect_page.min.js'
                   }               
               },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                node: true
            },
            globals: {
                exports: true
            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 默认任务
    grunt.registerTask('default', ['uglify','jshint']);
}