
define(function(require){
    var app = require("app");
    var Backbone = require("backbone");
    
    var RecentGamesItemModel = require("models/content/dashboard/recentgames/RecentGamesItemModel");
    
    var RecentGamesCollection = Backbone.Collection.extend({
        
        model:RecentGamesItemModel,
        
        initialize: function()
        {
            
        }
    });
    return RecentGamesCollection;
})