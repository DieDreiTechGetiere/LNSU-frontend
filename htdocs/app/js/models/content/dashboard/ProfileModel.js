
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ProfileModel = Backbone.Model.extend({
        
        defaults: {
            baseImageUrl: "media/image/profilepictures/",
            baseRankUrl: "media/image/ranks/"
        },
        
        initialize: function()
        {
            this.checkForNull();
            this.setRankings();
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
        },
        
        
        /**
         * 
         */
        setRankings: function()
        {
            var elo = parseInt(this.get("elo"));
            
            if(elo >= 2900)
            {
                this.setRankInfos("flottenadmiral");
            }
            else if(elo >= 2600)
            {
                this.setRankInfos("fregattenkapitaen");
            }
            else if(elo >= 2300)
            {
                this.setRankInfos("oberlieutenant");
            }
            else if(elo >= 2000)
            {
                this.setRankInfos("hauptbootsmann");
            }
            else if(elo >= 1850)
            {
                this.setRankInfos("obermaat");
            }
            else if(elo >= 1650)
            {
                this.setRankInfos("seekadett");
            }
            else if(elo >= 1350)
            {
                this.setRankInfos("stabsgefreiter");
            }
            else if(elo >= 1150)
            {
                this.setRankInfos("matrose");
            }
            else if(elo >= 900)
            {
                this.setRankInfos("kartoffelschaeler");
            }
            else
            {
                this.setRankInfos("latrinenputzer");
            }
        },
        
        
        /**
         * 
         */
        setRankInfos: function(rank)
        {
            this.set("profileImage", this.get("baseImageUrl") + rank + ".png");
            this.set("rankImage", this.get("baseRankUrl") + rank + ".png");
            this.set("rankName", rank.charAt(0).toUpperCase() + rank.slice(1));
        }
    });
    return ProfileModel;
});