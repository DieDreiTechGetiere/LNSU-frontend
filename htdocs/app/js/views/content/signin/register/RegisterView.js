

define(function(require){
    
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var app = require("app");
    var notification = require("notification");
    
    var RegisterView = Backbone.Marionette.ItemView.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/signin/register/RegisterView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            username: "#login_name",
            ingameName: "#ingame_name",
            password: "#password"
        },
        
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        initialize: function()
        {   
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        handleRegisterSubmit: function(event)
        {
            console.log("regitser submit");
            event.preventDefault();
            Date.now = function() { return new Date().getTime() };
            
            this.model.set("loginName", $(this.ui.username).val());
            this.model.set("ingameName", $(this.ui.ingameName).val());
            this.model.set("password", $(this.ui.password).val());
            this.model.set("timestamp", Date.now());
            
            this.model.registerUser();
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            console.log("register fin");
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
            "submit .register_form": "handleRegisterSubmit"
        }
    });
    
    return RegisterView;
})