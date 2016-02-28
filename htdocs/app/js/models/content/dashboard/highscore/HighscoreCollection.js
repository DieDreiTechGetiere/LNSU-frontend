
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var HighscoreItemModel = require("models/content/dashboard/highscore/HighscoreItemModel");
    
    var HighscoreCollection = Backbone.Model.extend({
        model: HighscoreItemModel,
        
        initialize: function()
        {
            
        },
    });
    return HighscoreCollection;
});