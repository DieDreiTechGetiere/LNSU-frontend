define(function(require){
    
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var app = require("app");
    var notification = require("notification");
    
    var LoginView = Backbone.Marionette.ItemView.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/signin/login/loginView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            loginForm: ".login_form",
            username: "#login_name",
            password: "#password"
        },
        
        
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        initialize: function()
        {
            this.listenTo(this.model, "change", this.render);
            
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        handleFormSubmit: function(event)
        {
            event.preventDefault();
            
            this.model.set("username", $(this.ui.username).val());
            this.model.set("password", $(this.ui.password).val());
            
            this.model.userSignin();
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            
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
            "submit @ui.loginForm": "handleFormSubmit"
        }
    });
    
    return LoginView;
})