
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
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
            Date.now = function() { return new Date().getTime() };
         //   this.set("timestamp", Date.now());
            console.log("loginModel. ", this);
            
            this.save(null, {
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