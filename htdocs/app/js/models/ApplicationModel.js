/**
 * Created by nmaier on 14.07.15.
 */

define(function(require){

    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");

    var LoginModel = require("LoginModel");

    var ApplicationModel = Backbone.Model.extend
    ({
        defaults: {
            appReady: false,
            currentView: undefined
        },
        
        
        /**
         *
         */
        initialize: function()
        {
            this.on("change:appReady", this.appIsReady, this);
            
            this.set("login", new LoginModel());
        },
        
        
        /**
         * 
         */
        appIsReady: function()
        {
            // reset hash before starting router to not fuck it up
            window.location.hash = "";
            app.execute(notification.command.application.START_ROUTER);
        },
        
        
        /**
         * 
         */
        handleLoginError: function()
        {
            this.trigger("loginError");
        },
        
    });

    return ApplicationModel;
});