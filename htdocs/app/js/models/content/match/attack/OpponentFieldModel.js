
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var OpponentFieldModel = Backbone.Model.extend({
        
        url: settings.backendBaseUrl + "game",
        
        defaults: {
            shotCoordinates: undefined,
            placementPhase: false,
            userID: undefined
        },
        
        
        initialize: function()
        {
            this.on("change:shotCoordinates", this.sendShotToServer, this);
            
            this.set("userID", parseInt( app.userModel.get("id") ));
        },
        
        
        /**
         * 
         */
        sendShotToServer: function()
        {
            this.set("matchID", app.matchModel.get("id"));
            app.global.showLoader();
            
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
                                app.matchModel.set("myTurn", true);
                            }
                            else if(response.hit == false)
                            {
                                app.matchModel.set("myTurn", false);
                            }
                        }
                        else if(response.win == true)
                        {
                            alert("handle win");
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