
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
            
            this.$el.attr("data-defaulttop", this.model.get("top"));
            this.$el.attr("data-shiplength", this.model.get("shipLength"));
            this.$el.attr("data-direction", "horizontal");
        },
        
        
        /**
         * 
         */
        turnShip: function(e)
        {
            if(this.$el.hasClass("dropped"))
            {
                e.preventDefault();
                
                var currHeight = this.$el.height(),
                    currWidth = this.$el.width();
                    
                this.$el
                    .height(currWidth)
                    .width(currHeight)
                ;
                
                if(this.$el.attr("data-direction") === "horizontal")
                {
                    this.$el.attr("data-direction", "vertical");
                }
                else
                {
                    this.$el.attr("data-direction", "horizontal");
                }
                this.$el.simulate("drag");
                var self = this;
                setTimeout(function(){
                    var curTop = self.$el.css("top");
                    var curLeft = self.$el.css("left");
                    
                    self.$el
                        .css("left", curLeft + 59 + "px")
                        .css("top", curTop + 59 + "px");
                },1000);
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
            "contextmenu": "turnShip"
        }
    });
    return ShipView;
});