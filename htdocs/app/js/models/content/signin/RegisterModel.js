
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
    var RegisterModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'user/register',
        
        defaults: {
            id: undefined,
            loginName: "",
            password: "",
            success: false
        },
        
        initialize: function()
        {
            
        },
        
        
        registerUser: function()
        {
            var self = this;
            this.save(null, {
                success: function(data)
                {
                    var jsonData = data.toJSON();
                    app.global.hideLoader();
                    if(jsonData.registerSuccess == true)
                    {
                        self.set("success", true);
                        alert("Your registration has been saved, please wait for an admin to confirm it");
                    }
                },
                error: function(data, error)
                {
                    app.global.hideLoader();
                    console.log("regiser error: ", error);
                }
            })
        }
        
    });
    return RegisterModel;
})