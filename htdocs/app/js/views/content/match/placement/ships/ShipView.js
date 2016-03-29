
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
        
        initDraggable: function()
        {
            console.log("ship el: ", this.$el);
            // this.$el.draggable({
            //     obstacle: ".shipView",
            //     grid: [30, 30],
            //     preventCollision: true,
            //     containment: ".placement_container"
            // });
            
         //   var draggableSelector = ".list .item:not(.dropped)";
            var self = this;
			var init = function() {
                self.$el
                    .css("left", (self.$el.width() + 5) + "px")
                    .draggable({
                        //helper: 'clone',
                        revert: 'invalid',
                        start: function(event,ui) {
                            var $clone = ui.helper.clone();
                            $clone
                                .removeClass("ui-draggable ui-draggable-dragging")
                                //.removeAttr("id")
                                .insertAfter(ui.helper)
                            ;
                            $(this).data("clone",$clone);
                        },
                        stop: function(event,ui) {
                            if( $(".ui-draggable-dragging.dropped").length == 0) {
                                $(this).data("clone").remove();
                            };
                        },
                        //the following are for the jquery-ui-draggable-collision plugin
                        refreshPositions: true,
                        obstacle: '.shipView.dropped',
                        preventCollision: true,
                    })
                ;
				
				$('.game').droppable({
				    accept: '.shipView'
				    ,drop: function(event,ui) {
				    	ui.draggable
				    		.addClass("dropped")
				    	;
				    //	setTimeout(reinit, 500);
				    }
				});				
			};
			
			var reinit = function() {
                console.log("reinit");
				$(".shipView.ui-draggable").draggable("destroy");
				init();
			}
			
			init();
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
      //      this.initDraggable();
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
            
        }
    });
    return ShipView;
});