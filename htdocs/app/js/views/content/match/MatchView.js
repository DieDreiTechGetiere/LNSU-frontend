
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
            GAME: "gameView",
            PLACEMENT: "placementView",
            ATTACK: "attackView"
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        viewInstances: {},
        /**
         * 
         */
        ui: {
            game: ".game_region"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
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


        /**
         * 
         */
        initItemViews: function()
        {
            this.initPlacementView();
        },


        /**
         * 
         */
        initPlacementView: function()
        {
            var PlacementView = app.mapper.getViewFor(this.views.PLACEMENT);
            this.viewInstances[this.views.PLACEMENT] = new PlacementView({
                id: this.views.PLACEMENT,
                className: "placement_view",
                model: this.model.get("placement")
            });
            $(this.ui.game).html(this.viewInstances[this.views.PLACEMENT].el);
            this.viewInstances[this.views.PLACEMENT].finalize();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        initAttackMode: function()
        {
            this.viewInstances[this.views.PLACEMENT].destroy();
            this.model.initAttackModel();
            this.initAttackView();
        },
        
        
        /**
         * 
         */
        initAttackView: function()
        {
            var AttackView = app.mapper.getViewFor(this.views.ATTACK);
            this.viewInstances[this.views.ATTACK] = new AttackView({
                id: this.views.ATTACK,
                className: "attack_view",
                model: this.model.get("attack")
            });
            $(this.ui.game).html(this.viewInstances[this.views.ATTACK].el);
            this.viewInstances[this.views.ATTACK].finalize();
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        onShow: function()
        {
            this.initItemViews();
            app.execute(notification.command.application.OPEN_OVERLAY, "howToPlay");
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