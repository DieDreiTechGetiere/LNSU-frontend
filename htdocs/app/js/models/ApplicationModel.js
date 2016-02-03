/**
 * Created by nmaier on 14.07.15.
 */

define(function(require){

    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");

    var SigninModel = require("SigninModel");

    var ApplicationModel = Backbone.Model.extend
    ({
        defaults: {
            appReady: false,
            currentView: undefined
        },
        
        
        /**
         *
         */
        initialize: function(data)
        {
            this.on("change:appReady", this.appIsReady, this);
            
            this.setModels(data);
        },
        
        
        /**
         * 
         */
        setModels: function(data)
        {
            this.set("signin", new SigninModel(data.signin));
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