
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    
    var notification = require("notification");
    var settings = require("settings");
    
    var InfoModel = require("models/content/match/placement/InfoModel");
    var ShipsCollection = require("models/content/match/placement/ships/ShipsCollection");
    
    var PlacementModel = Backbone.Model.extend({
        
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
        }
        
    });
    return PlacementModel;
});