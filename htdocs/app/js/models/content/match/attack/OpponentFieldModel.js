
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var OpponentFieldModel = Backbone.Model.extend({
        
        url: settings.backendBaseUrl + "game",
        
        defaults: {
            placementPhase: false,
            userID: undefined
        },
        
        
        initialize: function()
        {
            this.set("userID", parseInt( app.userModel.get("id") ));
        },
        
        
        /**
         * sends my shot to the server and tells view about the hit or miss
         * further sets the myTurn prop. of matchModel to true or false
         */
        sendSHotToServer: function()
        {
            this.set("matchID", app.matchModel.get("id"));
            
            this.save(null, {
                success: function(data, response)
                {
                    if(response.IsHit == true)
                    {
                        app.vent.trigger("hit");
                    }
                    else if(response.IsHit == false)
                    {
                        app.vent.trigger("miss");
                        app.matchModel.set("myTurn", false);
                    }
                    
                    if(response.YouWon == true)
                    {
                        _.defer(function(){
                            app.execute(notification.command.application.OPEN_OVERLAY, "win");
                        });
                    }
                    app.global.hideLoader();
                },
                error: function(error)
                {
                    console.log("error sendShotToServer: ", error);
                    app.execute(notification.command.application.OPEN_OVERLAY, "error");
                    app.global.hideLoader();
                }
            });
        }
        
    });
    return OpponentFieldModel;
});