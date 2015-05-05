module.exports = function (config) {
    config.set({
        basePath : '../',
        files : [
            'public/angular.js',
            'public/javascripts/[^\_]*.js',
            'public/**/*.js',
            'public/*.js'
        ],
        autoWatch : true,
        frameworks : ['jasmine'],
        browsers : ['Firefox'],
        plugins : ['karma-firefox-launcher',
                   'karma-jasmine'
                  ],
        junitReporter : {
            outputFile : 'unit.xml',
            suite : 'unit'
        }
    });
}; 
