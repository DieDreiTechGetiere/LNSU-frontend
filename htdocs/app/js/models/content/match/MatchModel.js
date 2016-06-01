
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    
    var notification = require("notification");
    var settings = require("settings");
    
    var PlacementModel = require("models/content/match/placement/PlacementModel");
    var AttackModel = require("models/content/match/attack/AttackModel");
    
    var MatchModel = Backbone.Model.extend({
        
        url: settings.backendBaseUrl + "game",
        
        defaults: {
            myTurn: true,
            myTurnPolling: undefined
        },
        
        initialize: function()
        {
            this.set("id", parseInt(this.get("match").id));
            this.on("change:myTurn", this.reactToTurnChange, this);
            
            this.initSubmodels();
        },
        
        
        /**
         * 
         */
        initSubmodels: function()
        {
            this.set("placement", new PlacementModel());
        },
        
        
        /**
         * 
         */
        initAttackModel: function()
        {
            this.set("attack", new AttackModel());
        },
        
        
        /**
         * 
         */
        reactToTurnChange: function()
        {
            console.log("reactToTurnChange()");
            if(this.get("myTurn") == false)
            {
                this.initMyTurnPolling();
            }
        },
        
        
        /**
         * 
         */
        initMyTurnPolling: function()
        {
            var dataString = 
                app.matchModel.get("id")
                + ":" + 
                app.userModel.get("id")
                + ":" + 
                0
            ;
            var self = this;
            this.set("myTurnPolling",
                setInterval(function()
                {
                    self.fetch({
                        data: {
                            id: dataString
                        },
                        success: function(data, response)
                        {
                            if(response.OpponentWon == false)
                            {
                                if(response.Hits.length > 0)
                                {
                                    app.vent.trigger(notification.event.OPPONENT_HIT, response.Hits);
                                }
                                if(response.Miss["x"] != undefined && response.Miss["y"])
                                {
                                    app.vent.trigger(notification.event.OPPONENT_MISSED, response.Miss);
                                }
                                if(response.OpponentReady == true)
                                {
                                    self.clearMyTurnPolling();
                                    self.set("myTurn", true);
                                }
                            }
                            else
                            {
                                app.execute(notification.command.application.OPEN_OVERLAY, "loss");
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