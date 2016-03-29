/**
 * Created by nmaier on 15.04.15.
 */
 
define(function(require){

    var app = require("app");

    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");

    var ApplicationView = Backbone.Marionette.LayoutView.extend({

        /* @Properties ----------------------------------------------------------------------- */

        el: '.main-stage',
        /**
         *
         */
        regions: {
            mainRegion: "#main_region"
        },
        views: {
            SIGNIN: "signinView",
            DASHBOARD: "dashboardView",
            MATCH: "matchView"
        },
        /**
         * 
         */
        viewInstances: {},
        /**
         *
         */
        viewsReady: 0,
        /**
         * 
         */
        viewsToBeReady: 1,


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.initViewListeners();
            
            this.initViews();
            this.render();
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change:contentRegion", this.showRegionView, this);
            this.listenTo(app.vent, notification.event.SECTION_READY, this.countSectionsReady);
        },


        /**
         * 
         */
        initViews: function()
        {
            this.initSigninView();
            this.initDashboardView();
        },
        

        /* @Methods -------------------------------------------------------------------------- */

        initMatchView: function()
        {
            var MatchView = app.mapper.getViewFor(this.views.MATCH);
            this.viewInstances["matchView"] = this.matchView = new MatchView({
                id: "matchView",
                className: "match_view",
                model: app.matchModel
            });
        },
        
        
        /**
         * 
         */
        initDashboardView: function()
        {
            var DashboardView = app.mapper.getViewFor(this.views.DASHBOARD);
            this.viewInstances["dashboardView"] = this.dashboardView = new DashboardView({
                id: "dashboardView",
                className: "dashboard_view",
                model: this.model.get("dashboard")
            });
        },
        
        
        /**
         * 
         */
        initSigninView: function()
        {
            var SigninView = app.mapper.getViewFor(this.views.SIGNIN);
            this.viewInstances["signinView"] = this.signinView = new SigninView({
                id: "signinView",
                className: "signin_view",
                model: this.model.get("signin")
            });
        },

        
        
        /**
         * 
         */
        showRegionView: function()
        {
            this.mainRegion.show(this.viewInstances[this.model.get("contentRegion")], { preventDestroy: true });
        },


        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {
            app.global.hideLoader();
            app.log.info("application ready");
            app.model.set("appReady", true);
        },


        /**
         * 
         */
        countSectionsReady: function()
        {
            this.viewsReady++;
            if(this.viewsReady === this.viewsToBeReady)
            {
                this.finalize();
            }
        },
        
        
        /*
         *
         */
        render: function()
        {
            
        }

    });

    return ApplicationView;
});