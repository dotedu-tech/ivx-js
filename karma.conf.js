// Karma configuration
// Generated on Tue Mar 01 2016 12:10:38 GMT-0700 (MST)

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify', 'fixture'],

        plugins: [
            'karma-jasmine',
            'karma-babel-preprocessor',
            'karma-browserify',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-fixture',
            'karma-json-fixtures-preprocessor',
            'karma-html-reporter',
            "karma-teamcity-reporter"
        ],

        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/**/*Spec.js',
            'src/core/**/*.js',
            'src/angular/app.js',
            "src/modules/data/firebase/index.js",
             
            {
                pattern: 'test/mock-data/**/*.json',
                served: true
            }
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

            "src/core/**/*.js": ['browserify'],
            "src/modules/data/firebase/index.js" : ["browserify"],
            "src/angular/app.js": ['browserify'],
            
            
            "test/**/*Spec.js": ['browserify'],
            "test/**/*.json": ['json_fixtures']
        },

        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath;
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },

        browserify: {
            debug: true,
            transform: [['babelify', { presets: ['es2015'] }]]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'html'],

        // the default configuration 
        htmlReporter: {
            outputDir: 'docs/tests', // where to put the reports  
            templatePath: null, // set if you moved jasmine_template.html 
            focusOnFailures: true, // reports show failures on start 
            namedFiles: false, // name files instead of creating sub-directories 
            pageTitle: null, // page title for reports; browser info by default 
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
            reportName: 'karma-tests', // report summary filename; browser info by default 


            // experimental 
            preserveDescribeNesting: false, // folded suites stay folded  
            foldAll: false, // reports start folded (only with preserveDescribeNesting) 
        },


        // web server port
        port: 9876,

        // coverageReporter: {
        //     type: "html",
        //     dir: "docs/tests/coverage/"
        // },


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],

        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
