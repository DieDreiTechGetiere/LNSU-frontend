
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
            shipsRegion: ".ships_region"
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
            $(this.ui.shipsRegion).html(this.shipsView.render().el);
            
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
            var self = this,
                draggableSelector = ".shipsView .shipView:not(.dropped)",
                init = function() {
				
                    $(".shipView:not(.dropped)").each(function(i){
                        $(this)
                            .draggable({
                                //helper: 'clone',
                                //revert: 'invalid',
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
                                revert : function(event, ui) {
                                    $(this).data("ui-draggable").originalPosition = {
                                        top : $(this).data("defaulttop").slice(0, -2),
                                        left : 0
                                    };
                                    return !event;
                                },
                                grid: [59, 59],
                                refreshPositions: true,
                                preventCollision: true,
                                obstacle: '.shipView.dropped'
                            })
                        ;
                    });
                    
                    $('.game').droppable({
                        accept: '.shipView',
                        drop: function(event,ui) {
                            var top = parseInt(ui.draggable.css("top").slice(0, -2)),
                                left = parseInt(ui.draggable.css("left").slice(0, -2));

                            ui.draggable
                                .css("top", top - 59)
                                .css("left", left - 59)
                                .addClass("dropped")
                            ;
                            
                            setTimeout(reinit, 500);
                        }
                    });
                },
			
			    reinit = function() {
                    $(".shipView.ui-draggable").draggable("destroy");
                    init();
                };
			
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