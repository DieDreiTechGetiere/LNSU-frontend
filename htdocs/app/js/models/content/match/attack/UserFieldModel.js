
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var UserFieldModel = Backbone.Model.extend({
        
        defaults: 
        {
            hits: new Array(),
            misses: new Array()
        },
        
        initialize: function()
        {   
            this.listenTo(app.vent, notification.event.OPPONENT_HIT, this.setHits);
            this.listenTo(app.vent, notification.event.OPPONENT_MISSED, this.setMisses);
        },
        
        
        /**
         * 
         */
        setHits: function(hits)
        {
            var self = this;
            var hitsArr = new Array();
            
            if(this.get("hits").length == 0)
            {
                this.get("hits")[0] = {"x": undefined, "y": undefined};
            }
            
            _.each(hits, function(hit, e)
            {
                for(var i = 0; i <= self.get("hits").length; i++)
                {
                    if(i < self.get("hits").length)
                    {
                        if(self.get("hits")[i]["x"] != hit["x"] ||
                            self.get("hits")[i]["y"] != hit["y"])
                        {
                            var tempObj = {"x": hit["x"], "y": hit["y"]};
                            hitsArr.push(tempObj);
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
            console.log("setMisses");
            var missesArr = new Array();
            var tempObj = {"x": misses["x"], "y": misses["y"]};
            
            missesArr.push(tempObj);
            
            this.set("misses", missesArr);
        }
    });
    return UserFieldModel;
});