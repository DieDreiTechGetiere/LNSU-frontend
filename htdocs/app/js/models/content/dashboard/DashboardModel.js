
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var PlayerSearchModel = require("models/content/dashboard/PlayerSearchModel");
    var HighscoreModel = require("models/content/dashboard/HighscoreModel");
    var ProfileModel = require("models/content/dashboard/ProfileModel");
    
    var DashboardModel = Backbone.Model.extend({
        url: settings.backendBaseUrl + "dashboard",
        
        defaults:{
            id: "dashboard"
        },
        
        
        initialize: function()
        {
            
        },
        
        
        /**
         * which will be filled up with passed data later..
         */
        initItemModels: function(modelData)
        {
            this.set("playerSearch", new PlayerSearchModel());
            this.set("hidhscore", new HighscoreModel(modelData.highscoreList));
            this.set("profile", new ProfileModel(modelData.stats));
            app.router.navigate(notification.router.DASHBOARD, {trigger: true});
        },
        
        
        /**
         * 
         */
        fetchDashboardData: function()
        {
            var self = this;
            this.fetch(
                {
                    data:{
                            id: app.userModel.get("id")
                    },
                    success: function(data, response)
                    {
                        self.initItemModels(response);
                    },
                    error: function(error)
                    {
                        console.log("error: ", error);
                    }
                }
            );
            // fetch data here - call to backend
            
            
            //onComplete, 
            // pass data.toJSON()
            // and hideLoader at some point...  ->
             
            
            
        }
    });
    return DashboardModel;
});