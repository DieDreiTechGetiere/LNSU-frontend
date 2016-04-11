define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    var settings = require("settings");
    
    var DashboardModel = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/dashboardView.html"),
        /**
         * 
         */
        views: {
            PLAYERSEARCH: "playerSearchView",
            PROFILE: "profileView",
            HIGHSCORE: "highscoreView",
            RECENTGAMES: "recentGamesView",
            ADMIN: "adminView"
        },
        viewInstances: new Array(),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        adminViewState: "closed",
        /**
         * 
         */
        ui: {
            highscore: ".highscore_region",
            playerSearch: ".playersearch_region",
            profile: ".profile",
            recentgames: ".recentgames",
            logo: ".logo",
            admin: ".admin_region"
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
            this.initRecentGamesView();
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
        initRecentGamesView: function()
        {
            var self = this;
            this.recentGamesView = new Backbone.Marionette.CollectionView({
                id: "recentgamesView",
                className: "recentgames_view",
                collection: self.model.get("recentGames"),
                childView: app.mapper.getViewFor(self.views.RECENTGAMES)
            });
            $(this.ui.recentgames).html(this.recentGamesView.render().el);
        },
        
        
        /**
         * 
         */
        initAdminView: function()
        {
            app.global.hideLoader();
            
            var AdminView = app.mapper.getViewFor(this.views.ADMIN);
            this.viewInstances[this.views.ADMIN] = new AdminView({
                id: this.views.ADMIN,
                className: "admin_view",
                model: this.model.get("admin")
            });
            $(this.ui.admin).html(this.viewInstances[this.views.ADMIN].el);
            this.viewInstances[this.views.ADMIN].finalize();
            
            this.animateAdminView();
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change", this.render, this);
            this.listenTo(this.model, "change:admin", this.initAdminView, this);
            this.listenTo(app.vent, notification.event.CLOSE_ADMIN, this.animateAdminView);
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        /**
         * shows adminView (if user is admin) to unlock users
         */
        showAdminView: function()
        {
            if(app.userModel.get("role") == 1)
            {
                app.router.navigate(notification.router.ADMIN, {trigger: true});
            }
        },
        
        
        /**
         * @param close : boolean
         */
        animateAdminView: function(close)
        {
            var self = this;
            if(close == true || this.adminViewState === "opened")
            {
                this.adminViewState = "animating";
                app.router.navigate(notification.router.DASHBOARD, {trigger: true});
                TweenMax.to(this.ui.admin, 1, {top: -748, onComplete: function(){
                    self.adminViewState = "closed";
                    if(close != true)
                    {
                        self.viewInstances[self.views.ADMIN].destroy();
                        self.model.get("admin").destroy();
                    }
                }});
            }
            else if(this.adminViewState === "closed")
            {
                this.adminViewState = "animating";
                TweenMax.to(this.ui.admin, 1, {top: 50, onComplete: function(){
                    self.adminViewState = "opened";
                }});
            }
        },
        
        
        /**
         * 
         */
        hoverLogo: function()
        {
            $(".logo_flipper").addClass("hoverLogo");
        },
        
        
        /**
         * 
         */
        mouseoutLogo: function()
        {
            $(".logo_flipper").removeClass("hoverLogo");
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        onShow: function()
        {
            this.initItemViews();
            
            this.checkDevState();
            
            if(app.userModel.get("role") == 1)
            {
                $(".logo").addClass("pointer");
                $(".logo_flipper").addClass("admin");
            }
        },
        
        
        /**
         * 
         */
        checkDevState: function()
        {
            if(settings.appEnvironment == "dev")
            {
                $.ajax({
                    method: "POST",
                    url: settings.backendBaseUrl + "test",
                    success: function(data)
                    {
                        console.log("dev success: ", data);
                    },
                    error: function(error)
                    {
                        console.log("dev error: ", error);
                    }
                });
            }
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
            "click .admin_link": "showAdminView",
            "mouseover .logo_container": "hoverLogo",
            "mouseout .logo_container": "mouseoutLogo"
        }
    });
    return DashboardModel;
});