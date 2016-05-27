
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
            this.on("change:y", this.sendShotToServer, this);
            
            this.set("userID", parseInt( app.userModel.get("id") ));
        },
        
        
        /**
         * sends my shot to the server and tells view about the hit or miss
         * further sets the myTurn prop. of matchModel to true or false
         */
        sendShotToServer: function()
        {
            this.set("matchID", app.matchModel.get("id"));
            
            this.save(null, {
                success: function(data, response)
                {
                    console.log("success sendShotToServer: ", response);
                    if(response.valid == true)
                    {
                        if(response.win == false)
                        {
                            if(reponse.hit == true)
                            {
                       //         app.matchModel.set("myTurn", true);
                                self.trigger("hit");
                            }
                            else if(response.hit == false)
                            {
                                self.trigger("miss");
                                app.matchModel.set("myTurn", false);
                            }
                        }
                        else if(response.win == true)
                        {
                            app.execute(notification.command.application.OPEN_OVERLAY, "win");
                        }
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