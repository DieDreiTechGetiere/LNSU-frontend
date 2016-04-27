
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var OverlayContentModel = Backbone.Model.extend({
        
        defaults: {},
        
        initialize: function()
        {
            
        }
        
    });
    return OverlayContentModel;
});