
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    
    var notification = require("notification");
    var settings = require("settings");
    
    var PlacementModel = require("models/content/match/placement/PlacementModel");
    var AttackModel = require("models/content/match/attack/AttackModel");
    
    var MatchModel = Backbone.Model.extend({
        
        baseUrl: settings.backendBaseUrl + "game",
        
        defaults: {
            myTurn: undefined,
            myTurnPolling: undefined
        },
        
        initialize: function()
        {
            this.set("id", parseInt(this.get("match").id));
            this.initSubmodels();
        },
        
        
        /**
         * 
         */
        initSubmodels: function()
        {
            this.set("placement", new PlacementModel());
            this.set("attack", new AttackModel());
        },
        
        
        /**
         * 
         */
        initMyTurnPolling: function()
        {
            var dataString = 
                false +
                ":" + 
                app.userModel.get("id") + 
                ":" +
                this.get("id")
            ;
            
            this.set("myTurnPolling", 
                setInterval(function()
                {
                    this.fetch({
                        data: dataString,
                        success: function(data, response)
                        {
                            console.log("myTurnPolling success: ", response);
                        },
                        error: function(error)
                        {
                            console.log("error initMyTurnPolling: ", error);
                            app.execute(notification.command.application.OPEN_LAYER, "error");
                            app.global.hideLoader();
                        }
                    });
                }, 1500)
            );
        },
        
        
        /**
         * 
         */
        clearMyTurnPolling: function()
        {
            clearInterval(this.get("myTurnPolling"));
        }
        
    });
    return MatchModel;
});