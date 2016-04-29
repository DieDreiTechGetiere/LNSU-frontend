
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ShipCountModel = require("models/content/match/placement/ShipCountModel");
    
    var InfoModel = Backbone.Model.extend({
        
        initialize: function()
        {
            this.set("shipCount", new ShipCountModel());
        },
    });
    return InfoModel;
});