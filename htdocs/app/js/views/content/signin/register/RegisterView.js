

define(function(require){
    
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var app = require("app");
    var notification = require("notification");
    
    var RegisterView = Backbone.Marionette.ItemView.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/signin/register/registerView.html"),
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
            password: "#password",
            error: ".error",
            textInput: ".text_input"
        },
        
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        initialize: function()
        {   
            this.listenTo(this.model, "change:success", this.handleFormSuccess, this);
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        handleFormSuccess: function()
        {
            console.log("success true");
            $.each($(this.ui.textInput), function(){
                console.log("each");
                $(this).val("");
            })
        },
        
        
        /**
         * 
         */
        handleRegisterSubmit: function(event)
        {
            Date.now = function() { return new Date().getTime() };
            
            this.model.set("loginName", $(this.ui.username).val());
            this.model.set("ingameName", $(this.ui.ingameName).val());
            this.model.set("password", $(this.ui.password).val());
            this.model.set("timestamp", Date.now());
            
            this.model.registerUser();
        },
        
        
        /**
         * 
         */
        validateFormInput: function(event)
        {
            event.preventDefault();
            
            var countEmptyFields = 0;
            $.each($(this.ui.textInput), function(){
                if($(this).val() == "")
                {
                    $(this).css("border", "1px solid red");
                    countEmptyFields++;
                }
            });
            if(countEmptyFields == 0)
            {
                app.global.showLoader();
                this.handleRegisterSubmit();
            }
            else
            {
                $(this.ui.error).html(this.model.get("errorMessage"));
            }
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
            "submit .register_form": "validateFormInput"
        }
    });
    
    return RegisterView;
})