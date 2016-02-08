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
            signIn: "#signin_region",
            switchLink: ".switch_link"
        },
        /**
         * 
         */
        viewInstances: {},


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
        },


        /**
         * 
         */
        initViews: function()
        {
            this.initLoginView();
            this.initRegisterView();
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
            if(this.model.get("currentView") == "registerView")
            {
                this.viewInstances["loginView"].remove();
                this.initRegisterView();
            }
            else
            {
                this.viewInstances["registerView"].remove();
                this.initLoginView();
            }
            
            $(this.ui.signIn).html(this.viewInstances[this.model.get("currentView")].el);
            this.viewInstances[this.model.get("currentView")].finalize();
        },
        
        
        /**
         * 
         */
        switchViews: function()
        {
            var viewToShow = this.model.get("currentView") === "loginView" ? "registerView" : "loginView";
            console.log("viewToShow: ", viewToShow);
            this.model.set("currentView", viewToShow);  
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {
            // later set currentView somewhere else
            //this.model.set("currentView", "loginView");
            
            $(this.ui.signIn).html(this.viewInstances["loginView"].el);
            this.viewInstances["loginView"].finalize();
        },
        
        
        /*
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
            "click @ui.switchLink": "switchViews"
        }

    });

    return SigninView;
});