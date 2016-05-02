
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
            myTurn: true,
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
            var self = this;
            this.set("myTurnPolling", 
                setInterval(function()
                {
                    this.fetch({
                        data: dataString,
                        success: function(data, response)
                        {
                            //TODO hat gegner mich getroffen ja->hit anzeigen/nein->myTurn
                            console.log("myTurnPolling success: ", response);
                            if(response.opponentWin == false)
                            {
                                if(typeof response.coordinates != undefined)
                                {
                                    console.log("opponent did shot");
                                    app.vent.trigger(notification.event.OPPONENT_HIT_ME, response.coordinates);
                                }
                                
                                if(OpponentReady == true)
                                {    
                                    self.set("myTurn", true);
                                }
                            }
                            else
                            {
                                alert("opponent won! you suck");
                            }
                        },
                        error: function(error)
                        {
                            console.log("error initMyTurnPolling: ", error);
                            app.execute(notification.command.application.OPEN_LAYER, "error");
                            app.global.hideLoader();
                        }
                    });
                }, 2500)
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