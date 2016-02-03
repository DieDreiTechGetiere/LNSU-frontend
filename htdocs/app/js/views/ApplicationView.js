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
            SIGNIN: "signinView"
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
            this.listenTo(this.model, "change:currentView", this.showRegionView, this);
            this.listenTo(app.vent, notification.event.SECTION_READY, this.countSectionsReady);
        },


        /**
         * 
         */
        initViews: function()
        {
            this.initSigninView();
        },
        

        /* @Methods -------------------------------------------------------------------------- */

        initSigninView: function()
        {
            var SigninView = app.mapper.getViewFor(this.views.SIGNIN);
            this.viewInstances["signinView"] = this.signinView = new SigninView({
                id: "signinView",
                model: this.model.get("signin")
            });
            
            // later set currentView somewhere else
            this.model.set("currentView", "signinView");
        },

        
        
        /**
         * 
         */
        showRegionView: function()
        {
            this.mainRegion.show(this.viewInstances[this.model.get("currentView")]);
            this.viewInstances[this.model.get("currentView")].finalize();
        },


        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {
            app.model.set("appReady", true);
            app.global.hideLoader();
            app.log.info("application ready");
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