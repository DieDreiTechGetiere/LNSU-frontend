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
            mainRegion: "#main_region",
            overlayRegion: "#overlay_region"
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
        viewsToBeReady: 2,


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
            this.listenTo(this.model, "change:contentRegion", this.showMainRegionView, this);
            this.listenTo(this.model, "change:overlayRegion", this.showOverlayRegion, this);
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
        showMainRegionView: function()
        {
            this.mainRegion.show(this.viewInstances[this.model.get("contentRegion")], { preventDestroy: true });
        },
        
        
        /**
         * 
         */
        showOverlayRegion: function(appModel, viewData)
        {
            if(app.model.get("overlayRegion") != undefined)
            {
                $("#overlay_region").css("display", "block");
                var view = new viewData
                            .viewClass({
                                id: viewData.id,
                                model: viewData.viewModel,
                                className: viewData.className
                            });
                this.overlayRegion.show(view);
            }
            else
            {
                this.overlayRegion.empty();
                $("#overlay_region").css("display", "none");
            }
        },


        /**
         * 
         */
        initAttackView: function()
        {
            if(this.model.get("contentRegion") === "matchView")
            {
                this.viewInstances[this.model.get("contentRegion")].initAttackMode();
            }
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {
            app.log.info("application ready");
            app.model.set("appReady", true);
            app.global.hideLoader();
            app.controller.initTesting();
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