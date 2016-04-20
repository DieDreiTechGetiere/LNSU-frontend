
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    
    var notification = require("notification");
    var settings = require("settings");
    
    var InfoModel = require("models/content/match/placement/InfoModel");
    var ShipsCollection = require("models/content/match/placement/ships/ShipsCollection");
    
    var PlacementModel = Backbone.Model.extend({
        
        url: settings.backendBaseUrl + "game",
        
        
        initialize: function()
        {   
            this.initSubmodels();
        },
        
        
        /**
         * 
         */
        initSubmodels: function()
        {
            this.set("info", new InfoModel());
            this.set("ships", new ShipsCollection(app.shipConfig.ships));
        },
        
        
        /**
         * init 12x12 array with value 0 everywhere
         */
        initGridArray: function()
        {
            var arr = new Array(12);
            for (var i = 0; i < arr.length; i++)
            {
                arr[i] = new Array(12);
                
                for (var j = 0; j < 12; j++)
                {
                    arr[i][j] = 0;
                }
            }
            this.set("gridArray", arr);
        },
        
        
        /**
         * 
         */
        saveShipInGridArray: function(shipData)
        {
            if(shipData.direction === "horizontal")
            {
                for(l = 0; l < shipData.length; l++)
                {
                    this.get("gridArray")
                        [ shipData.$matchedField.data("y") ]
                        [ parseInt( shipData.$matchedField.data("x") ) + l ] = 1;
                }
            }
            else if(shipData.direction === "vertical")
            {
                for(l = 0; l < shipData.length; l++)
                {
                    this.get("gridArray")
                        [ parseInt( shipData.$matchedField.data("y") ) + l ]
                        [ shipData.$matchedField.data("x") ] = 1;
                }
            }
            else
            {
                alert("you are cheating - fuck off!");
            }
        },
        
        
        /**
         * 
         */
        sendShipsToServer: function()
        {
            var dataObj = 
            {
                placementphase: true,
                matchID: app.matchModel.get("id"),
                userID: parseInt(app.userModel.get("id")),
                ships: this.get("gridArray")
            };
            this.unset("gridArray");
            
            var self = this;
            this.save(dataObj, 
            {
                success: function(data, response)
                {
                    console.log("send ships to server success: ", data, response);
                    if(response.OpponentReady == false)
                    {
                        self.initOpponentReadyPolling();
                    }
                },
                error: function(data, error)
                {
                    console.log("send ships to server error: ", data, error);
                }
            });
        },
        
        
        /**
         * 
         */
        initOpponentReadyPolling: function()
        {
            var self = this;
            this.set("pollInterval", setInterval(function(){
                self.fetch({
                    data: {
                        matchID: app.matchModel.get("id"),
                        userID: app.userModel.get("id"),
                        round: 0
                    },
                    success: function(data, response)
                    {
                        if(response.OpponentReady == true)
                        {
                            self.clearOpponentReadyPolling();
                            //app.execute(notification.command.match.ATTACK);
                            console.log("opponent READY");
                        }
                    },
                    error: function(error)
                    {
                        console.log("error: ", error);
                    }
                });
            }, 2000));
        },
        
        
        /**
         * 
         */
        clearOpponentReadyPolling: function()
        {
            clearInterval(this.get("pollInterval"));
        }
        
    });
    return PlacementModel;
});