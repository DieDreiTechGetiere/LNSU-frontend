/**
 * Created by nmaier on 21.04.15.
 */

define(function(require) {

    var app = require("app");
    var Backbone = require("backbone");

    var SigninModel = Backbone.Model.extend
    ({
        urlRoot: 'http://lnsu-backend.de/user/sign',
        /**
         * 
         */
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
            console.log("signinmodel: ", this);
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

    return SigninModel;
});