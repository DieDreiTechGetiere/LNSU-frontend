
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
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
                success: function(data)
                {
                    console.log("success: ", data);
                },
                error: function(data, error)
                {
                    console.log("error: ", error);
                }
            })
        }
        
    });
    return LoginModel;
})