
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var HighscoreItemModel = require("models/content/dashboard/highscore/HighscoreItemModel");
    
    var HighscoreCollection = Backbone.Collection.extend({
        model: HighscoreItemModel,
        
        initialize: function()
        {
            
        },
    });
    return HighscoreCollection;
});