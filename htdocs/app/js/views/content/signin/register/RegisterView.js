

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
            passwordRepeat: "#password_repeat",
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
                if($(this.ui.password).val() !== $(this.ui.passwordRepeat).val())
                {
                    $(this.ui.passwordRepeat).css("border", "1px solid red");
                    $(this.ui.password).css("border", "1px solid red");
                    
                    $(this.ui.error).html("your given passwords dont match");
                }
                else
                {
                    app.global.showLoader();
                    this.handleRegisterSubmit();
                }
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
            "submit .register_form": "validateFormInput"
        }
    });
    
    return RegisterView;
})