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

            app.commands.setHandler(notification.command.application.SIGN_IN, ApplicationCommand.renderToDo);
        },


        /**
         * register application logger
         */
        registerLogger: function()
        {
            app.log = require('loglevel');
            //app.log.disableAll();
            app.log.setLevel(settings.defaultConfig.loglevel);
            //app.log.info("init application view");
        },


        /**
         *
         */
        initTesting: function()
        {
            if (settings.defaultConfig.runTests)
            {
                var specRunner = require("SpecRunner");
                specRunner.start();
            }
        },


        /* @Methods -------------------------------------------------------------------------- */

        start: function()
        {
            //this.fetchJsonData();
            this.initAppModel();

        //    this.initApplicationRouter();
        },


        /**
         *
         */
        fetchJsonData: function()
        {
            var self = this;
            $.ajax({
                method: "GET",
                url: "frontend/app/data/data.json",

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
        initAppModel: function()
        {
            app.model = new ApplicationModel();
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
         //   this.startRouting();
        },


        /**
         * trigger: true -> navigate() doesnt trigger its matched route function
         * in the router instance naturally
         */
        startRouting: function()
        {
            var startHash = window.location.hash;
            var userValid = app.global.checkIfUserIsValid();

            if (app.global.checkIfUserIsValid())
            {
                console.log("user is valid");
                app.model.fetchUserDataForHome();
            }
            else
            {
                app.router.navigate(notification.router.LOGIN, {trigger: true});
            }
        },


    });

    return ApplicationController;
});
