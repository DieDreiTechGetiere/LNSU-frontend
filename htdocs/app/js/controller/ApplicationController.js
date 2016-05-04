/**
 * Created by nmaier on 15.07.15.
 */

define(function(require)
{
    var app = require('app');
    var Marionette = require('marionette');
    var Backbone = require('backbone');
    var TemplateMapper = require("TemplateMapper");
    var PreloadController = require("PreloadController");
    var PreloadCommand = require("PreloadCommand");
    var notification = require("notification");
    var settings = require("settings");

    var ApplicationModel = require("appModel");
    var GlobalModel = require("global");
    var StorageModel = require("models/StorageModel");
    var ApplicationCommand = require("appCommand");
    var MatchCommand = require("MatchCommand");
    var ApplicationRouter = require("ApplicationRouter");
    
    var UserModel = require("models/UserModel");
    

    var ApplicationController = Marionette.Controller.extend(
    {

        /* @Properties ----------------------------------------------------------------------- */



        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.initBasics();
            this.initEventListener();
            this.registerLogger();
        },
        
        
        /**
         * 
         */
        initBasics: function()
        {
            app.global = new GlobalModel();
            app.global.showLoader();
            
            app.storageModel = new StorageModel();

            app.mapper = TemplateMapper;
            
            app.preload = new PreloadController();
            
            //alle 60min wird user gecheckt und rausgeworfen 
            setInterval(function() {
                if(window.location.hash != "#match")
                {
                    window.location.reload();
                }
            }, 3701000);
        },
        
        
        /**
         *
         */
        initEventListener: function ()
        {
            //ApplicationCommand
            app.commands.setHandler(notification.command.application.START_ROUTER, this.initApplicationRouter, this);
            app.commands.setHandler(notification.command.application.LOGIN_SUCCESS, ApplicationCommand.handleLoginSuccess);
            app.commands.setHandler(notification.command.application.INIT_DASHBOARD, ApplicationCommand.initDashboardView);
            app.commands.setHandler(notification.command.application.LOGOUT, ApplicationCommand.logOut);
            app.commands.setHandler(notification.command.application.OPEN_OVERLAY, ApplicationCommand.openOverlay);
            
            //Match Command
            app.commands.setHandler(notification.command.match.DELETE, MatchCommand.deleteMatch);
            app.commands.setHandler(notification.command.match.START, MatchCommand.startMatch);
            app.commands.setHandler(notification.command.match.INIT_GRID, MatchCommand.initGridView);
            app.commands.setHandler(notification.command.match.ATTACK, MatchCommand.startAttack);
            
            app.commands.setHandler(notification.command.application.SIGN_IN, ApplicationCommand.renderToDo);
        },


        /**
         * register application logger
         */
        registerLogger: function()
        {
            app.log = require('loglevel');
            //app.log.disableAll();
            app.log.setLevel(settings.loglevel);
            //app.log.info("init application view");
        },


        /**
         *
         */
        initTesting: function()
        {
            if (settings.runTests)
            {
                var specRunner = require("SpecRunner");
                specRunner.start();
            }
        },


        /* @Methods -------------------------------------------------------------------------- */

        start: function()
        {
            this.fetchJsonData();
        },


        /**
         *
         */
        fetchJsonData: function()
        {
            var self = this;
            $.ajax({
                method: "GET",
                url: settings.jsonPath,

                success: function (data) {
                    self.initAppModel(data);
                },
                error: function (data, error) {
                    console.log("error fetching json: ", error);
                }
            });
            
            $.ajax({
                method: "GET",
                url: settings.shipconfig,

                success: function (data) {
                    app.shipConfig = data;
                },
                error: function (data, error) {
                    console.log("error fetching shipconfigjson: ", error);
                }
            });
        },


        /**
         *
         */
        initAppModel: function(data)
        {
            app.model = new ApplicationModel(data);
            this.instantiateApplicationView();
        },


        /**
         * init applicationView and kick of image-preloading
         */
        instantiateApplicationView: function()
        {
            var ApplicationView = app.mapper.getViewFor("applicationView");
            app.view = new ApplicationView({
                model: app.model
            });
            _.defer(function(){
                app.vent.trigger(notification.event.SECTION_READY);
                //kick off image preloading
                PreloadCommand.initialize();
            });
        },


        /**
         * gets called, when app is ready. app.model.get("appReady") = true
         */
        initApplicationRouter: function()
        {
            app.router = new ApplicationRouter();
            Backbone.history.start();
            this.startRouting();
        },


        /**
         * trigger: true -> navigate() doesnt trigger its matched route function
         * in the router instance naturally
         */
        startRouting: function()
        {
            if (app.storageModel.checkIfUserIsLoggedIn() == true)
            {
                app.userModel = new UserModel({
                    id: app.storageModel.get("userId"),
                    ingameName: app.storageModel.get("ingameName"),
                    loginName: app.storageModel.get("loginName"),
                    role: app.storageModel.get("role")
                });
                app.model.get("dashboard").fetchDashboardData();
            }
            else
            {
                app.router.navigate(notification.router.SIGNIN, {trigger: true});
            }
        },


    });

    return ApplicationController;
});
