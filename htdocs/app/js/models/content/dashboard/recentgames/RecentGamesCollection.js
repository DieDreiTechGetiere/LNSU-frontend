
define(function(require){
    var app = require("app");
    var Backbone = require("backbone");
    
    var RecentGamesItemModel = require("models/content/dashboard/recentgames/RecentGamesItemModel");
    
    var RecentGamesCollection = Backbone.Collection.extend({
        
        model:RecentGamesItemModel,
        
        initialize: function()
        {
            this.reverseSortByField("id");
        },
        
        /**
         * reverse sort because it comes out of the database in the wrong order
         */
        reverseSortByField: function(fieldName) {
            this.sort_key = fieldName;
            this.sort();
        },
    
        comparator: function(item) {
            return -item.get(this.sort_key);
        },
    });
    return RecentGamesCollection;
});