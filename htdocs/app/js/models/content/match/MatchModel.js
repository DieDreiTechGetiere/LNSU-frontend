
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    
    var notification = require("notification");
    var settings = require("settings");
    
    var MatchModel = Backbone.Model.extend({
        baseUrl: settings.backendBaseUrl,
        
        
        initialize: function()
        {
            console.log("matchModel: ", this);
            this.set("id", parseInt(this.get("match").id));
        }
        
    });
    return MatchModel;
})