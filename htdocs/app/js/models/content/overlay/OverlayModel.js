
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var OverlayContentModel = require("models/content/overlay/OverlayContentModel");
    
    var OverlayModel = Backbone.Model.extend({
        
        initialize: function(options)
        {
            this.initSubModels(options);
        //    this.listenTo(this, "change:overlayType");
        },
        
        
        /**
         * 
         */
        initSubModels: function(options)
        {
            for(e in options)
            {
                this.set(e, new OverlayContentModel(options[e]));
            }
        },
        
        
        /**
         * returns submodel for actual overlay view
         */
        getOverlayContentModel: function(subModel)
        {
            return this.get(subModel);
        }
        
    });
    return OverlayModel;
});