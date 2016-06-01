
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var UserFieldModel = Backbone.Model.extend({
        
        defaults: 
        {
            hits: []
        },
        
        initialize: function()
        {   
            this.listenTo(app.vent, notification.event.OPPONENT_HIT, this.setHits, this);
            this.listenTo(app.vent, notification.event.OPPONENT_MISSED, this.setMisses, this);
        },
        
        
        /**
         * 
         */
        setHits: function(hits)
        {
            var self = this;
            var hitsArr = Array();
            console.log("setHits()");
            _.each(hits, function(hit, i)
            {
                for(var i = 0; i <= self.get("hits").length; i++)
                {
                    if(i < self.get("hits").length)
                    {
                        if(self.get("hits")[e][0] != hit[0] ||
                            self.get("hits")[e][1] != hit[1])
                        {
                            hitsArr.push(hit);
                        }
                    }
                }
            });
            this.set("hits", hitsArr);
        },
        
        
        /**
         * 
         */
        setMisses: function(misses)
        {
            this.set("misses")["x"] = misses["x"];
            this.set("misses")["y"] = misses["y"];
        }
    });
    return UserFieldModel;
});