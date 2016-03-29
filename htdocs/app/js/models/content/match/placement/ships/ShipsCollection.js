
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ShipItemModel = require("models/content/match/placement/ships/ShipItemModel");
    
    var ShipsCollection = Backbone.Collection.extend({
        model: ShipItemModel,
        
        initialize: function()
        {
            
        },
        
    });
    return ShipsCollection;
});