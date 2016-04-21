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
            password: "#password",
            error: ".error",
            textInput: ".text_input"
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
            this.model.set("loginName", $(this.ui.username).val());
            this.model.set("password", $(this.ui.password).val());
            
            this.model.userSignin();
        },
        
        
        /**
         * 
         */
        validateFormInput: function(event)
        {
            event.preventDefault();
            this.clearRedBorder();
            
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
                this.handleFormSubmit();
            }
            else
            {
                $(this.ui.error).html(this.model.get("errorMessage"));
            }
        },
        
        
        /**
         * 
         */
        clearRedBorder: function()
        {

            $.each($(this.ui.textInput), function()
            {
                if($(this).val() != "")  // $(this) ist pro Durchlauf das objekt (ohne) inhalt
                {
                    $(this).removeAttr("style");
                }
            }); // END $.each
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
            "submit @ui.loginForm": "validateFormInput"
        }
    });
    
    return LoginView;
})