/**
 * Created by nmaier on 21.04.15.
 */

define(function(require) {

    var app = require("app");
    var Backbone = require("backbone");
    
    var LoginModel = require("LoginModel");
    var RegisterModel = require("RegisterModel");

    var SigninModel = Backbone.Model.extend({
        
        defaults: {
            currentView: "loginView"
        },


        initialize: function()
        {
            this.set("login", new LoginModel(this.get("login")));
            this.set("register", new RegisterModel(this.get("register")))
        }
    });

    return SigninModel;
});