
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    var notification = require("notification");
    
    var LoginModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'user/login',
        
        defaults: {
            id: undefined,
            username: "",
            password: "",
        },
        
        
        initialize: function()
        {
            
        },
        
        
        userSignin: function()
        {
            this.save(null, {
                success: function(data)
                {
                    app.global.hideLoader();
                    var jsonData = data.toJSON();
                    if(jsonData.loginSuccess == false)
                    {
                        alert(jsonData.errors.errorMessage);
                    }
                    else if(jsonData.loginSuccess == true)
                    {
                        app.execute(notification.command.application.LOGIN_SUCCESS, jsonData);
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