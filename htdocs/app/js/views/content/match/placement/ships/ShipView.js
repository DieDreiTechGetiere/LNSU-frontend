
/**
 *  TODO : style ships, get the draggable working!
 */

define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var ShipView = Backbone.Marionette.ItemView.extend({
        
        className: "shipView",
        /**
         * 
         */
        template: require("text!views/content/match/placement/ships/shipView.html"),
        /**
         * 
         */
        views: {
            
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.initViewListeners();
            this.render();
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change", this.render, this);
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        markupConfig: function()
        {
            this.$el.css("top", this.model.get("top"));
            this.$el.css("width", this.model.get("shipLength") * 59);
        },
        
        
        /**
         * 
         */
        turnShip: function(e)
        {
            if(this.$el.hasClass("dropped"))
            {
              //  e.preventDefault();
             //   alert("turn");
            }
        },
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.$el.attr("data-defaulttop", this.model.get("top"));
            this.markupConfig();
        },
        
        
        /**
         * 
         */
        render: function()
        {
            if(!this.rendered)
            {
                var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
                this.$el.html(renderedTemplate);
                this.rendered = true;
            }
            else
            {}
        },
        
        
        events: {
            "contextmenu": "turnShip"
        }
    });
    return ShipView;
});