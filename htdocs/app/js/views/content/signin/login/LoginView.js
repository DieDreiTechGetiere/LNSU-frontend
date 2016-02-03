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
            loginForm: ".login_form"
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
            
            this.model.set("username", event.originalEvent.srcElement[0].value);
            this.model.set("password", event.originalEvent.srcElement[1].value);
            
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
                console.log("loginModel: ", this.model);
                var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
                this.$el.append(renderedTemplate);
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