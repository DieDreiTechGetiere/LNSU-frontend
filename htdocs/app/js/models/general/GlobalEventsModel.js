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
            }, 600);
        },


        /**
         *
         */
        showLoader: function () 
        {
            $(".loader-pos").css("display", "block");
        }
    });

    return GlobalModel;
});
