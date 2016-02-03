/**
 * Created by kpetersen on 03.02.16.
 */
 
define(function(require){

    var app = require("app");

    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");

    var SigninView = Backbone.Marionette.ItemView.extend({

        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/signin/signinView.html"),
        /**
         * 
         */
        views: {
            LOGIN: "loginView",
            REGISTER: "registerView"
        },
        /**
         * 
         */
        ui: {
            signIn: "#signin_region"
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
            this.initLoginView();
        },
        

        /* @Methods -------------------------------------------------------------------------- */

        initLoginView: function()
        {
            var LoginView = app.mapper.getViewFor(this.views.LOGIN);
            this.viewInstances["loginView"] = this.loginView = new LoginView({
                id: "loginView",
                model: this.model.get("login")
            });
        },


        /**
         * 
         */
        initRegisterView: function()
        {
            var RegisterView = app.mapper.getViewFor(this.views.REGISTER);
            this.viewInstances["registerView"] = this.registerView = new RegisterView({
                id: "registerView",
                model: this.model.get("register")
            });
        },
        
        
        /**
         * 
         */
        showRegionView: function()
        {
            $(this.ui.signIn).append(this.viewInstances[this.model.get("currentView")]);
        },


        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {
            // later set currentView somewhere else
            this.model.set("currentView", "registerView");
        },


        /**
         * 
         */
        countSectionsReady: function()
        {
            this.viewsReady++;
            if(this.viewsReady == this.viewsToBeReady)
            {
                this.finalize();
            }
        },
        
        
        /*
         *
         */
        render: function()
        {
            if(!this.rendered)
            {
                var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
                this.$el.append(renderedTemplate);
                this.rendered = true;
            }
            else
            {}
        }

    });

    return SigninView;
});