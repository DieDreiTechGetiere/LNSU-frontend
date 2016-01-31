/**
 * Created by nmaier on 21.04.15.
 */

define(function(require) {

    var app = require("app");
    var Backbone = require("backbone");

    var ContentItemModel = require("ContentItemModel");

    var ContentCollection = Backbone.Collection.extend({
        url: '',
        model: ContentItemModel,

    });

    return ContentCollection;
});