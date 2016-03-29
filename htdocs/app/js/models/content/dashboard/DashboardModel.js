
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var RecentGamesCollection = require("models/content/dashboard/recentgames/RecentGamesCollection");
    var PlayerSearchModel = require("models/content/dashboard/PlayerSearchModel");
    var HighscoreModel = require("models/content/dashboard/highscore/HighscoreModel");
    var ProfileModel = require("models/content/dashboard/ProfileModel");
    var AdminModel = require("models/content/dashboard/AdminModel");
    
    var DashboardModel = Backbone.Model.extend({
        url: settings.backendBaseUrl + "dashboard",
        
        defaults:{
            id: "dashboard"
        },
        
        
        initialize: function()
        {
            this.listenTo(app.vent, notification.event.FETCH_ADMIN, this.fetchAdminData, this);
        },
        
        
        /**
         * which will be filled up with passed data later..
         */
        initItemModels: function(modelData)
        {
            var backboneJsonObjMatchList = JSON.parse(JSON.stringify($.map(modelData.matchList, function(el) { return el })));
            this.set("recentGames", new RecentGamesCollection(backboneJsonObjMatchList));
            this.unset("matchList");
            
            this.set("playerSearch", new PlayerSearchModel());
            
            var backboneJsonObjHighscores = JSON.parse(JSON.stringify($.map(modelData.highscoreList, function(el) { return el })));
            this.set("highscore", new HighscoreModel(backboneJsonObjHighscores));
            this.unset("highscoreList");
            
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
        },
        
        
        /**
         * 
         */
        fetchAdminData: function()
        {
            var self = this;
            this.fetch(
                {
                    url: self.url + "/inactive",
                    success: function(data, response)
                    {
                        self.set("admin", new AdminModel(response));
                    },
                    error: function(error)
                    {
                        console.log("fetchAdmin error: ", error);
                    }
                }
            );
        }
        
        
    });
    return DashboardModel;
});