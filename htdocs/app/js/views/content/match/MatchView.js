
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var MatchView = Backbone.Marionette.ItemView.extend({
        
        template: require("text!views/content/match/matchView.html"),
        /**
         * 
         */
        views: {
            INFO: "infoView",
            GAME: "gameView"
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            info: "info_region",
            game: "game_region"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            console.log("MatchView: ", this.model);
            this.initViewListeners();
            this.render();
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change", this.render, this);
        },

        initItemViews: function(){
            this.initInfoView();
            this.initGameView();
        }

        initInfoView: function(){
            var InfoView = app.mapper.getViewFor(this.views.INFO);
            this.viewInstances[this.views.INFO] = new InfoView({
                id: this.views.INFO,
                className: "info_view",
                model: this.model.get("info")
            });
            $(this.ui.info).html(this.viewInstances[this.views.INFO].el);
            this.viewInstances[this.views.INFO].finalize();
        },

        initGameView: function(){
            var GameView = app.mapper.getViewFor(this.views.GAME);
            this.viewInstances[this.views.GAME] = new GameView({
                id: this.views.GAME,
                className: "game_view",
                model: this.model.get("info")
            });
            $(this.ui.game).html(this.viewInstances[this.views.GAME].el);
            this.viewInstances[this.views.GAME].finalize();
        }, 
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initItemViews();
        },
        
        
        /**
         * 
         */
        render: function()
        {
            if(!this.rendered)
            {
                var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
                this.$el.html(renderedTemplate);
                this.rendered = true;
            }
            else
            {}
        },
        
        
        events: {
            
        }
    });
    return MatchView;
})