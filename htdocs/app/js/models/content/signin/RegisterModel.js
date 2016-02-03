
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var settings = require("settings");
    
    var RegisterModel = Backbone.Model.extend({
        
        urlRoot: settings.backendBaseUrl + 'user/register',
        
        
        initialize: function()
        {
            
        }
    });
    return RegisterModel;
})