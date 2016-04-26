
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
            this.$el.css("top", parseInt(this.model.get("top")));
            this.$el.css("left", parseInt(this.model.get("left")));
            this.$el.css("width", this.model.get("shipLength") * 60);
            
            this.$el.attr("data-defaulttop", this.model.get("top"));
            this.$el.attr("data-shiplength", this.model.get("shipLength"));
            this.$el.attr("data-direction", "horizontal");
        },
        
        
        /**
         * 
         */
        turnShip: function(e)
        {
            if(this.$el.data("direction") == "horizontal" && this.model.get("shipLength") != 1)
            {
                e.preventDefault();
                
                var currHeight = this.$el.height(),
                    currWidth = this.$el.width();
                    
                this.$el
                    .width(currHeight)
                    .height(currWidth);
                    
                
                if(this.$el.attr("data-direction") === "horizontal")
                {
                    this.$(".ship_view").addClass("vertical");
                    this.$el.attr("data-direction", "vertical");
                }
                else
                {
                    this.$(".ship_view").removeClass("vertical");
                    this.$el.attr("data-direction", "horizontal");
                }
                this.$el.simulate("drag");
            }
        },
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
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
            "contextmenu": "turnShip",
            "dblclick": "turnShip"
        }
    });
    return ShipView;
});