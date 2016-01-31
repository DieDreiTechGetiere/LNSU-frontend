/**
 * Created by nmaier on 21.04.15.
 */

define(function(require) {

    var app = require("app");
    var Backbone = require("backbone");

    var LoginModel = Backbone.Model.extend
    ({
        urlRoot: '',

        initialize: function()
        {}
    });

    return LoginModel;
});