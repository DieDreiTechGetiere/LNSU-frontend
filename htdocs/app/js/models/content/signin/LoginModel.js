
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
    var LoginModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'login',
        
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
                    
                },
                error: function(error)
                {
                    
                }
            })
        }
        
    });
    return LoginModel;
})