
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ShipItemModel = Backbone.Model.extend({
        
        initialize: function()
        {
      //      console.log("shipItem init");
        },
    });
    return ShipItemModel;
});