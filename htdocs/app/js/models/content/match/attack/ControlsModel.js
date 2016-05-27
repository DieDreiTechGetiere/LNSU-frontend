
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ControlsModel = Backbone.Model.extend({
        
        defaults: {
            whoseTurn: "",
            whoseTurnCopy: ["it´s your turn! Do something!", "your opponent is currently trying to hit you..."]
        },
        
        initialize: function()
        {
            this.listenTo(app.matchModel, "change:myTurn", this.handleTurnChange, this);
            this.handleTurnChange();
        },
        
        
        /**
         * sets copy to tell user wether its his turn or opponents 
         */
        handleTurnChange: function()
        {
            if(app.matchModel.get("myTurn") == true)
            {
                this.set("whoseTurn", this.get("whoseTurnCopy")[0]);
            }
            else
            {
                this.set("whoseTurn", this.get("whoseTurnCopy")[1]);
            }
        }
    });
    
    return ControlsModel;
});