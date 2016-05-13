
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var MatchModel = require("models/content/match/MatchModel");
    
    var PlayerSearchModel = Backbone.Model.extend({
        url: settings.backendBaseUrl + "game/search",
        
        defaults: {
            sending: false,
        },
        
        
        initialize: function()
        {
            
        },
        
        
        /**
         * 
         */
        initSearchGame: function()
        {
            this.set("sending", true);
            this.set("userId", parseInt(app.userModel.get("id")));
            var self = this;
            
            this.save(null, {
                success: function(data, response)
                {
                    app.matchModel = new MatchModel(response);
                    if(response.foundOpponent == false)
                    {
                        self.initPolling();
                    }
                    else
                    {
                        self.trigger("clearTimer");
                        app.execute(notification.command.match.START);
                    }
                },
                error: function(error)
                {
                    console.log("error: ", error);
                    app.execute(notification.command.application.OPEN_OVERLAY, "error");
                    app.global.hideLoader();
                }
            })
        },
        
        
        /**
         * 
         */
        initPolling: function()
        {
            var self = this;
            this.set("pollInterval", setInterval(function(){
                
                self.fetch({
                    data: {
                        id: app.matchModel.get("id")
                    },
                    success: function(data, response)
                    {
                        if(response.foundOpponent == true)
                        {
                            self.clearPlayersearchInterval();
                            self.trigger("clearTimer");
                            app.execute(notification.command.match.START);
                        }
                    },
                    error: function(error)
                    {
                        console.log("error: ", error);
                        app.execute(notification.command.application.OPEN_OVERLAY, "error");
                        app.global.hideLoader();
                    }
                });
                
            }, 1100));
        },
        
        
        /**
         * 
         */
        clearPlayersearchInterval: function()
        {
            clearInterval(this.get("pollInterval"));
        }
        
    });
    return PlayerSearchModel;
});