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
                $(".loader-pos").fadeOut(100, function()
                {
                    $("#loader-img").removeClass("rotate");
                });
            }, 200);
        },


        /**
         *
         */
        showLoader: function ()
        {
            $(".loader-pos").fadeIn(200, function() 
            {
                $("#loader-img").addClass("rotate");
            });
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
