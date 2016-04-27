/**
 * Created by nmaier on 14.07.15.
 */

define(function(require){

    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");

    var SigninModel = require("SigninModel");
    var DashboardModel = require("models/content/dashboard/DashboardModel");
    var OverlaysModel = require("models/content/overlay/OverlayModel");

    var ApplicationModel = Backbone.Model.extend
    ({
        defaults: {
            appReady: false,
            contentRegion: undefined,
            overlayRegion: undefined
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
            this.set("dashboard", new DashboardModel());
            this.set("overlays", new OverlaysModel(data.overlays));
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
        
    });

    return ApplicationModel;
});