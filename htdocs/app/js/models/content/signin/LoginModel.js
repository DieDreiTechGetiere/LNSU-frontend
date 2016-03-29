
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    var notification = require("notification");
    
    var LoginModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'user/login',
        
        defaults: {
            id: undefined,
            loginName: "",
            password: "",
        },
        
        
        initialize: function()
        {
            
        }, 
        
        
        userSignin: function()
        {
            this.save(null, 
            {
                success: function(data, response)
                {
                    app.global.hideLoader();
                    
                    if(response.loginSuccess == false)
                    {
                        alert(response.errors.errorMessage);
                    }
                    else if(response.loginSuccess == true)
                    {
                        app.execute(notification.command.application.LOGIN_SUCCESS, response.user);
                    }
                },
                error: function(data, error)
                {
                    app.global.hideLoader();
                    console.log("error: ", error);
                }
            })
        }
        
    });
    return LoginModel;
})