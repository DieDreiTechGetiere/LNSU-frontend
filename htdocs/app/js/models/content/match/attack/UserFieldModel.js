
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
            if(app.matchModel.get("myTurn") == false)
            {
                app.matchModel.initMyTurnPolling();
            }
            
            this.listenTo(app.vent, notification.event.OPPONENT_HIT_ME, this.setHits, this);
        },
        
        
        /**
         * 
         */
        setHits: function(hits)
        {
            var self = this;
            _.each(hits, function(hit, i)
            {
                if(self.get("hits").length >= 1)
                {
                    for(e in self.get("hits"))
                    {
                        if(self.get("hits")[e][0] != hit[0] ||
                            self.get("hits")[e][1] != hit[1])
                        {
                            self.get("hits").push(hit);
                        }
                    }
                }
            });
        }
    });
    return UserFieldModel;
});