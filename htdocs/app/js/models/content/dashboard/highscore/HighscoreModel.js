
define(function(require){
    
    var Backbone = require("backbone");
    var HighscoreCollection = require("models/content/dashboard/highscore/HighscoreCollection");
    
    var HighscoreModel = Backbone.Model.extend({
        
        initialize: function(options)
        {
            this.set("highscores", new HighscoreCollection(options));
        }
    });
    return HighscoreModel;
});