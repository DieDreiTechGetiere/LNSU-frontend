
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var PlayerSearchModel = Backbone.Model.extend({
        url: settings.backendBaseUrl + "game/search",
        
        defaults: {
            sending: false
        },
        
        
        initialize: function()
        {
            
        },
        
        
        /**
         * 
         */
        initSearchGame: function()
        {
          //  this.set("sending", true);
            this.set("userId", parseInt(app.userModel.get("id")));
            this.save(null, {
                success: function(data, response)
                {
                    console.log("success gamesearch: ", response);
                //    this.initPolling();
                },
                error: function(error)
                {
                    console.log("error: ", error);
                }
            })
        },
        
        
        /**
         * 
         */
        initPolling: function()
        {
            this.set("pollInterval", setInterval(function(){
                
            }, 1000));
        }
        
    });
    return PlayerSearchModel;
});