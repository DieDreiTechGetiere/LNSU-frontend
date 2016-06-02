
define(function(require){
    var app = require("app");
    var Backbone = require("backbone");
    
    var RecentGamesItemModel = Backbone.Model.extend({
        
        initialize: function()
        {
            this.setOpponentData();
        },
        
        
        /**
         * have to set it manually, because return from backend cant
         * decide which of the users of a match is the "opponent"
         */
        setOpponentData: function()
        {
            if(this.get("user1Name") != app.userModel.get("ingameName"))
            {
                this.set("opponentName", this.get("user1Name"));
                this.unset("user1Name");
                this.set("opponentElo", this.get("user1ELO"));
            }
            else
            {
                this.set("opponentName", this.get("user2Name"));
                this.unset("user2Name");
                this.set("opponentElo", this.get("user2ELO"));
            }
        }
    });
    return RecentGamesItemModel;
})