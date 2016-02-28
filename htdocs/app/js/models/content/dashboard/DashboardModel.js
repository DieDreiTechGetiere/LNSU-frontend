
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var RecentGamesCollection = require("models/content/dashboard/recentgames/RecentGamesCollection");
    var PlayerSearchModel = require("models/content/dashboard/PlayerSearchModel");
    var HighscorCollection = require("models/content/dashboard/highscore/HighscoreCollection");
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
            var backboneJsonObjMatchList = JSON.parse(JSON.stringify($.map(modelData.matchList, function(el) { return el })));
            this.set("recentGames", new RecentGamesCollection(backboneJsonObjMatchList));
            this.set("playerSearch", new PlayerSearchModel());
            
            var backboneJsonObjHighscores = JSON.parse(JSON.stringify($.map(modelData.highscoreList, function(el) { return el })));
            this.set("highscores", new HighscorCollection(backboneJsonObjHighscores));
            
            this.set("profile", new ProfileModel(modelData.stats));
            
            app.router.navigate(notification.router.DASHBOARD, {trigger: true});
            console.log("dashboardMode: ", this);
        },
        
        
        /**
         * 
         */
        buildCollectionObjects: function(response)
        {
            var objArray = new Array(),
                counter = 0;
            
            
            console.log("arr: ", arr);
            for(var e = 0; e < arr.length; e++)
            {
                console.log("matchItem: ", response.matchList[e]);
                arr[counter] = new Array();
                arr[counter].push(response.matchList[e].date);
                arr[counter].push(response.matchList[e].id);
                arr[counter].push(response.matchList[e].user1);
                arr[counter].push(response.matchList[e].user2);
                arr[counter].push(response.matchList[e].winner);
                counter++;
            }
            console.log("build arr: ", arr);
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
                 //       self.buildCollectionObjects(response);
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