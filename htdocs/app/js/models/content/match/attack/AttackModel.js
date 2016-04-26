
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    
    var ControlsModel = require("models/content/match/attack/ControlsModel");
    var OpponentFieldModel = require("models/content/match/attack/OpponentFieldModel");
    var UserFieldModel = require("models/content/match/attack/UserFieldModel");
    
    var AttackModel = Backbone.Model.extend({
        
        initialize: function()
        {
            this.initSubModels();
        },
        
        
        /**
         * 
         */
        initSubModels: function()
        {
            this.set("controls", new ControlsModel());
            this.set("opponentField", new OpponentFieldModel());
            this.set("userField", new UserFieldModel());
        }
    });
    return AttackModel;
});