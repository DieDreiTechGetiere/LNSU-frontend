
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
    var RegisterModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'user/register',
        
        defaults: {
            id: undefined,
            username: "",
            password: "",
        },
        
        initialize: function()
        {
            
        },
        
        
        registerUser: function()
        {
            this.save(null, {
                success: function(data)
                {
                    console.log("register success: ", data);
                },
                error: function(data, error)
                {
                    console.log("regiser error: ", error);
                }
            })
        }
        
    });
    return RegisterModel;
})