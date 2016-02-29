define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var DashboardModel = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/dashboardView.html"),
        /**
         * 
         */
        views: {
            PLAYERSEARCH: "playerSearchView",
            PROFILE: "profileView",
            HIGHSCORE: "highscoreView"
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
            highscore: ".highscore_region",
            playerSearch: ".playersearch_region",
            profile: ".profile_region"
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
            this.initHighscoreView();
            this.initPlayerSearchView();
            this.initProfileRegion();
        },
        
        
        /**
         * 
         */
        initHighscoreView: function()
        {
            var HighscoreView = app.mapper.getViewFor(this.views.HIGHSCORE);
            this.viewInstances[this.views.HIGHSCORE] = new HighscoreView({
                id: this.views.HIGHSCORE,
                className: "highscore_view",
                model: this.model.get("highscore")
            });
            $(this.ui.highscore).html(this.viewInstances[this.views.HIGHSCORE].el);
            this.viewInstances[this.views.HIGHSCORE].finalize();
        },
        
        
        /**
         * 
         */
        initPlayerSearchView: function()
        {
            var PlayerSearchView = app.mapper.getViewFor(this.views.PLAYERSEARCH);
            this.viewInstances[this.views.PLAYERSEARCH] = new PlayerSearchView({
                id: this.views.PLAYERSEARCH,
                className: "playersearch_view",
                model: this.model.get("playerSearch")
            });
            $(this.ui.playerSearch).html(this.viewInstances[this.views.PLAYERSEARCH].el);
            this.viewInstances[this.views.PLAYERSEARCH].finalize();
        },
        
        
        /**
         * 
         */
        initProfileRegion: function()
        {
            var ProfileView = app.mapper.getViewFor(this.views.PROFILE);
            this.viewInstances[this.views.PROFILE] = new ProfileView({
                id: this.views.PROFILE,
                className: "profile_view",
                model: this.model.get("profile")
            });
            $(this.ui.profile).html(this.viewInstances[this.views.PROFILE].el);
            this.viewInstances[this.views.PROFILE].finalize();
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