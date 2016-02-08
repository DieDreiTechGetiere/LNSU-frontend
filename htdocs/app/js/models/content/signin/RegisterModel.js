
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
        
        
        userSignin: function()
        {
            Date.now = function() { return new Date().getTime() };
         //   this.set("timestamp", Date.now());
            console.log("registerModel. ", this);
            
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
    return RegisterModel;
})