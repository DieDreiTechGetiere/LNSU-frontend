
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
        }
        
    });
    return MatchModel;
});