
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ProfileModel = Backbone.Model.extend({
        
        initialize: function()
        {
            this.checkForNull();
        },
        
        
        /**
         * 
         */
        checkForNull: function()
        {
            if(this.get("loses") == null)
            {
                this.set("loses", 0);
            }
            if(this.get("totalMatches") == null)
            {
                this.set("totalMatches", 0);
            }
            if(this.get("wins") == null)
            {
                this.set("wins", 0);
            }
        }
    });
    return ProfileModel;
});