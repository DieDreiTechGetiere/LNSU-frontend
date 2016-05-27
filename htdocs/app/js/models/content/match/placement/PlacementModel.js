
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
                        [ parseInt( shipData.$matchedField.data("y") ) ]
                        [ parseInt( shipData.$matchedField.data("x") ) + l ] = 1;
                }
            }
            else if(shipData.direction === "vertical")
            {
                for(l = 0; l < shipData.length; l++)
                {
                    this.get("gridArray")
                        [ parseInt( shipData.$matchedField.data("y") ) + l ]
                        [ parseInt( shipData.$matchedField.data("x") ) ] = 1;
                }
            }
            else
            {
                app.execute(notification.command.application.OPEN_OVERLAY, "cheating");
            //    app.execute(notificationcommand.match.DELETE);
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
                    console.log("send ships to server success response: ", response);
                    
                    if(response.error != undefined)
                    {
                        app.execute(notification.command.application.OPEN_OVERLAY, "cheating");
                    //    app.execute(notification.command.match.DELETE);
                        app.global.hideLoader();
                    }
                    else
                    {
                        //deciding who´s first. you sent your ships first? its your turn!
                        if(response.OpponentReady == false)
                        {
                            app.matchModel.set("myTurn", true);
                            self.initOpponentReadyPolling();
                        }
                        else if(response.OpponentReady == true)
                        {
                            app.matchModel.set("myTurn", false);
                            app.execute(notification.command.match.ATTACK);
                        }
                    }
                    
                },
                error: function(data, error)
                {
                    console.log("send ships to server error: ", data, error);
                    app.execute(notification.command.application.OPEN_OVERLAY, "error");
                    app.global.hideLoader();
                }
            });
        },
        
        
        /**
         * 
         */
        initOpponentReadyPolling: function()
        {
            var dataString = app.matchModel.get("id")
                        + ":"
                        + app.userModel.get("id")
                        + ":"
                        + 1;
            
            var self = this;
            this.set("pollInterval", setInterval(function(){
                self.fetch({
                    data: {
                        id: dataString,
                    },
                    success: function(data, response)
                    {
                        if(response.OpponentReady == true)
                        {
                            self.clearOpponentReadyPolling();
                            app.execute(notification.command.match.ATTACK);
                        }
                    },
                    error: function(error)
                    {
                        console.log("error: ", error);
                        app.execute(notification.command.application.OPEN_OVERLAY, "error");
                        app.global.hideLoader();
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