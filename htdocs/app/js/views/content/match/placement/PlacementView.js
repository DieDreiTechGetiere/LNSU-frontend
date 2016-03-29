
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var PlacementView = Backbone.Marionette.ItemView.extend({
        
        template: require("text!views/content/match/placement/placementView.html"),
        /**
         * 
         */
        views: {
            INFO: "infoView",
            SHIPS: "shipView"
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        viewInstances: {},
        /**
         * 
         */
        ui: {
            info: ".info_region",
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


        /**
         * 
         */
        initItemViews: function()
        {
            this.initInfoView();
            this.initShips();
            var self = this;
            _.defer(function(){
                self.initDraggAndDrop()
            });
        },
        
        
        /**
         * 
         */
        initInfoView: function()
        {
            var InfoView = app.mapper.getViewFor(this.views.INFO);
            this.viewInstances[this.views.INFO] = new InfoView({
                id: this.views.INFO,
                className: "info_view",
                model: this.model.get("info")
            });
            $(this.ui.info).html(this.viewInstances[this.views.INFO].el);
            this.viewInstances[this.views.INFO].finalize();
        },
        
        
        /**
         * 
         */
        initShips: function()
        {
            var self = this;
            this.shipsView = new Backbone.Marionette.CollectionView({
                id: "shipsView",
                className: "ships_view",
                collection: self.model.get("ships"),
                childView: app.mapper.getViewFor(self.views.SHIPS)
            });
            $(".ships_region").html(this.shipsView.render().el);
            
            this.shipsView.children.each(function(view){
                view.finalize();
            });
        },
        
        
        /**
         * 
         */
        initDraggAndDrop: function()
        {
            console.log("initDraggAndDrop");
            var self = this;
			var draggableSelector = ".shipsView .shipView:not(.dropped)";
			var init = function() {
				
				$(".shipView:not(.dropped)").each(function(i){
                    console.log("each ", i, "item: ", $(this));
					$(this)
					//	.css("top", ( ($(this).height() + 5) * i) + "px")
						.draggable({
							//helper: 'clone',
							revert: 'invalid',
							start: function(event,ui) {
					        	// var $clone = ui.helper.clone();
					        	// $clone
								// 	.removeClass("ui-draggable ui-draggable-dragging")
								// 	//.removeAttr("id")
								// 	.insertAfter(ui.helper)
								// ;
					        	// $(this).data("clone",$clone);
							},
							stop: function(event,ui) {
								// if( $(".ui-draggable-dragging.dropped").length == 0) {
								// 	$(this).data("clone").remove();
								// };
							},
							//the following are for the jquery-ui-draggable-collision plugin
                            grid: [30, 30],
							refreshPositions: true,
                            preventCollision: true,
							obstacle: '.shipView.dropped'
						})
					;
				});
				
				$('.game').droppable({
				    accept: '.shipView'
				    ,drop: function(event,ui) {
				    	ui.draggable
				    		.addClass("dropped")
				    	;
				    	setTimeout(reinit, 500);
				    }
				});
			};
			
			var reinit = function() {
			//	$(".shipView.ui-draggable").draggable("destroy");
				init();
			}
			
			init();
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initItemViews();
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
    
    return PlacementView;
});