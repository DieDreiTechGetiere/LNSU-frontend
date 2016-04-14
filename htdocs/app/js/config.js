/**
 * Created by nmaier on 21.04.15.
 */


require.config({

    baseUrl: 'app/js',

    paths: {
        //LIBS
        'backbone':         '../includes/libraries/backbone/backbone',
        'localstorage':     '../includes/libraries/backbone/backbone.localstorage.min',
        'underscore':       '../includes/libraries/underscore/underscore-min',
        'text':             '../includes/libraries/require/text',
        'jquery':           '../includes/libraries/jquery/jquery-1.11.1.min',
        'tweenmax':         '../includes/libraries/greensock/TweenMax.min',
        'timeline':         '../includes/libraries/greensock/TimelineMax.min',
        'marionette':       '../includes/libraries/marionette/backbone.marionette.min',
        'loglevel':         '../includes/libraries/loglevel/loglevel',
        'iscroll':          '../includes/libraries/iscroll/iscroll5',
        'jqueryui':         '../includes/libraries/jquery/jquery-ui.min',
        'jquerycollission': '../includes/libraries/jquery/jquery-collision.min',
        'jquerydraggable':  '../includes/libraries/jquery/jquery-ui-draggable-collision.min',
        'preload':          '../includes/libraries/preload/preload-0.6.2-min',
        'jquerySimulate':   '../includes/libraries/jquery/jquery-simulate',
        
        //TESTING LIBS
        'mocha':            '../includes/libraries/testing/mocha',
        'chai':             '../includes/libraries/testing/chai',
        'chai-jquery':      '../includes/libraries/testing/chai-jquery',
        'sinon':            '../includes/libraries/testing/sinon',
        'chaiChanges':      '../includes/libraries/testing/chaichanges',
        'chaibackbone':     '../includes/libraries/testing/chaibackbone',
        
        //BASICS
        'controller':       '../js/controller/ApplicationController',
        'ApplicationRouter': '../js/controller/ApplicationRouter',
        'PreloadController':'../js/controller/PreloadController',
        'PreloadCommand':   '../js/controller/commands/PreloadCommand',
        'appCommand':       '../js/controller/commands/ApplicationCommand',
        'MatchCommand':     '../js/controller/commands/MatchCommand',
        'settings':         'settings',
        'notification':     'notification',
        
        //MODELS
        'appModel':         '../js/models/ApplicationModel',
        'global':           '../js/models/general/GlobalEventsModel',
        'SigninModel':      '../js/models/content/signin/SigninModel',
        'LoginModel':       '../js/models/content/signin/LoginModel',
        'RegisterModel':    '../js/models/content/signin/RegisterModel',
        
        // TESTING
        'testsFile':         '../js/tests/test',
        'SpecRunner':       '../js/tests/SpecRunner'
        
    },
    shim: {
        'chai-jquery': ['jquery', 'chai'],
        jquerycollission: {
            deps: ['jqueryui', 'jquerydraggable']
        },
        jquerydraggable: {
            deps: ['jqueryui']
        },
        jquerySimulate: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        localstorage: {
            deps: ['backbone']
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        timeline: {
            deps: ['tweenmax']
        },
        SpecRunner: {
            deps: ['mocha', 'chai', 'chai-jquery', 'sinon', 'chaibackbone']
        },
        chaibackbone: {
            deps: ['sinon', 'chaiChanges', 'underscore', 'backbone']
        },
    },
    deps: ['jquery', 'underscore']
});

// the require(["app"]) --> baseUrl + app + .js  thats where app.js gets loaded and instantiated (return new app...)
require(["app", "controller", "jquery", "backbone", "marionette", "underscore", "tweenmax", "timeline", "loglevel", "iscroll", "localstorage", "jquerydraggable", "jquerycollission", "preload", "jquerySimulate"], function(app, ApplicationController) {
    app.controller = new ApplicationController();
    app.controller.start();
});