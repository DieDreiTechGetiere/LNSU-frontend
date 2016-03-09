/**
 * Created by nmaier on 21.04.15.
 */

define(function(require) {

    var Backbone = require("backbone");

    var GlobalModel = Backbone.Model.extend({

        initialize: function()
        {

        },


        /**
         *
         */
        hideLoader: function ()
        {
            setTimeout(function () {
                $(".loader-pos").css("display", "none");
            }, 100);
        },


        /**
         *
         */
        showLoader: function () 
        {
            $(".loader-pos").css("display", "block");
        },
        
        
        /**
         * 
         */
        checkIfUserIsLoggedIn: function()
        {
            var id = this.getUserCookie("userId"),
                ingameName = this.getUserCookie("ingameName"),
                loginName = this.getUserCookie("loginName");
            
            if(id == "" || ingameName == "" || loginName == "")
            {
                console.log("user false");
                return false;
            }
            else
            {
                console.log("user true");
                return true;
            }
        },
        
        
        /**
         * 
         */
        getUserCookie: function(key)
        {
            var name = key + "=";
            var ca = document.cookie.split(';');
            
            for (var i = 0; i < ca.length; i++) 
            {
                var c = ca[i];
                while (c.charAt(0)==' ')
                {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) 
                {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },


        /**
         * 
         */
        deleteUserCookie: function()
        {
            document.cookie = "userId=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = "ingameName=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = "loginName=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        },
    });

    return GlobalModel;
});
