
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ControlsModel = Backbone.Model.extend({
        
        initialize: function()
        {
            this.listenTo(app.matchModel, "change:myTurn", this.handleTurnChange, this);
        },
        
        
        /**
         * sets copy to tell user wether its his turn or opponents 
         */
        handleTurnChange: function()
        {
            //TODO
            console.log("handleTurnChange");
        }
    });
    return ControlsModel;
});