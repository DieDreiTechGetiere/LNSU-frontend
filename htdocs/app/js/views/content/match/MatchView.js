
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
            PLACEMENT: "placementView"
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
            placement: ".placement_region",
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
            $(this.ui.placement).html(this.viewInstances[this.views.PLACEMENT].el);
            this.viewInstances[this.views.PLACEMENT].finalize();
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        onShow: function()
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