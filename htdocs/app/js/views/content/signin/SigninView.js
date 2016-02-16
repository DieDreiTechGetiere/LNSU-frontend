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
            this.listenTo(this.model, "change:switchLink", this.render, this);
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
                className: "login_view",
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
                className: "register_view",
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
                this.model.set("switchLink", "...back to login");
            }
            else
            {
                this.viewInstances["registerView"].remove();
                this.initLoginView();
                this.model.set("switchLink", "register here...");
            }
            
            
            $(this.ui.signIn).html(this.viewInstances[this.model.get("currentView")].el);
            this.viewInstances[this.model.get("currentView")].finalize();
        },
        
        
        /**
         * 
         */
        switchViews: function()
        {
            var self = this;
            this.viewInstances[this.model.get("currentView")].$el.fadeOut(170, function(){
                var viewToShow = self.model.get("currentView") === "loginView" ? "registerView" : "loginView";
                self.model.set("currentView", viewToShow);
            });
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */

        finalize: function ()
        {   
            $(this.ui.signIn).html(this.viewInstances["loginView"].el);
            this.viewInstances["loginView"].finalize();
        },
        
        
        /*
         *
         */
        render: function()
        {
            var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
            this.$el.html(renderedTemplate);
            this.rendered = true;
        },
        
        
        events: {
            "click @ui.switchLink": "switchViews"
        }

    });

    return SigninView;
});