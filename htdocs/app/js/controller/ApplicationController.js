/**
 * Created by nmaier on 15.07.15.
 */

define(function(require)
{
    var app = require('app');
    var Marionette = require('marionette');
    var Backbone = require('backbone');
    var TemplateMapper = require("TemplateMapper");
    var notification = require("notification");
    var settings = require("settings");

    var ApplicationModel = require("appModel");
    var GlobalModel = require("global");
    var ApplicationCommand = require("appCommand");
    var ApplicationRouter = require("ApplicationRouter");
    
    var UserModel = require("models/UserModel");
    

    var ApplicationController = Marionette.Controller.extend(
    {

        /* @Properties ----------------------------------------------------------------------- */



        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            app.global = new GlobalModel();
            app.global.showLoader();

            app.mapper = TemplateMapper;

            this.initEventListener();
            this.registerLogger();
            this.initTesting();
        },


        /**
         *
         */
        initEventListener: function ()
        {
            app.commands.setHandler(notification.command.application.START_ROUTER, this.initApplicationRouter, this);
            app.commands.setHandler(notification.command.application.LOGIN_SUCCESS, ApplicationCommand.handleLoginSuccess);
            app.commands.setHandler(notification.command.application.INIT_DASHBOARD, ApplicationCommand.initDashboardView);

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
         *
         */
        instantiateApplicationView: function()
        {
            var ApplicationView = app.mapper.getViewFor("applicationView");
            app.view = new ApplicationView({
                model: app.model
            });
            app.vent.trigger(notification.event.SECTION_READY);
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
            if (app.global.checkIfUserIsLoggedIn() == true)
            {
                app.userModel = new UserModel({
                    id: app.global.getUserCookie("userId"),
                    ingameName: app.global.getUserCookie("ingameName"),
                    loginName: app.global.getUserCookie("loginName")
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
