define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var DashboardModel = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/dashboardView.html"),
        /**
         * 
         */
        views: {
            PLAYERSEARCH: "playerSearchView"
        },
        viewInstances: new Array(),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            playerSearch: ".playersearch_region"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.initViewListeners();
            this.render();
        },
        
        
        /**
         * called by finalize
         */
        initItemViews: function()
        {
            this.initPlayerSearchView();
        },
        
        
        /**
         * 
         */
        initPlayerSearchView: function()
        {
            var PlayerSearchView = app.mapper.getViewFor(this.views.PLAYERSEARCH);
            this.viewInstances[this.views.PLAYERSEARCH] = new PlayerSearchView({
                id: this.views.PLAYERSEARCH,
                className: "player_search",
                model: this.model.get("playerSearch")
            });
            $(this.ui.playerSearch).append(this.viewInstances[this.views.PLAYERSEARCH].el);
            this.viewInstances[this.views.PLAYERSEARCH].finalize();
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change", this.render, this);
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
    return DashboardModel;
});