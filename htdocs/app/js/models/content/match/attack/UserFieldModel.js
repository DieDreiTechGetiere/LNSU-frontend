
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var UserFieldModel = Backbone.Model.extend({
        
        defaults: 
        {
            hits: [],
            misses: {}
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
            _.each(hits, function(hit, i)
            {
                for(e in self.get("hits"))
                {
                    if(self.get("hits")[e][0] != hit[0] ||
                        self.get("hits")[e][1] != hit[1])
                    {
                        self.get("hits").push(hit);
                    }
                }
            });
        },
        
        
        /**
         * 
         */
        setMisses: function(misses)
        {
            this.get("misses")["x"] = misses["x"];
            this.get("misses")["y"] = misses["y"];
        }
    });
    return UserFieldModel;
});