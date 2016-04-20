
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
            SHIPS: "shipView",
            GRID: "gridView"
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
            this.listenTo(app.vent, notification.command.match.SAVE_SHIPS, this.initSaveShips, this);
        },


        /**
         * 
         */
        initItemViews: function()
        {
            this.initInfoView();
            this.initShips();
            this.initGridView();
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
        initGridView: function()
        {
            app.execute(notification.command.match.INIT_GRID, ".game");
        },
        
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        initDraggAndDrop: function()
        {
			this.initDragg();
            this.initDropp();	
        },
        
        
        /**
         * 
         */
        initDragg: function()
        {
            var self = this;
            $(".shipView").each(function(i){
                $(this).draggable({
                    start: function(event,ui) {
                        if($(this).hasClass("dropped"))
                        {
                            $(this)
                                .removeClass("dropped")
                            ;
                        }
                    },
                    stop: function(event,ui) {
                        console.log("stop");
                        if(!self.checkShipPositionInGrid($(this)))
                        {
                    //        ui.draggable.animate(ui.draggable.data().origPosition,"slow");
                        }
                        setTimeout(function(){
                            self.initDraggAndDrop();
                        }, 200);
                    //    return self.checkShipPositionInGrid($(this));
                    },
                    revert : function(event, ui) {
                        $(this).data("ui-draggable").originalPosition = {
                            top : $(this).data("defaulttop").slice(0, -2),
                            left : 0
                        };
                        return !event;
                    },
                    grid: [59, 59],
                    preventCollision: true,
                    obstacle: '.shipView.dropped'
                });//end draggable
            });//end each
        },
        
        
        /**
         * 
         */
        initDropp: function()
        {
            var self = this;
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
                    setTimeout(function(){
                        self.initDraggAndDrop();
                    }, 200);
                }
            });
        },
        
        
        /**
         * 
         */
        initSaveShips: function()
        {
            var allShipsPlaced = true;
            
            _.each($(".shipView:not(.dropped)"), function(item)
            {
                allShipsPlaced = false;
            });
            
            if(allShipsPlaced == true)
            {
                this.saveShips();
                console.log("gridArray: ", this.model.get("gridArray"));
            }
            else
            {
                alert("Please place all ships before saving!");
            }
        },
        
        
        /**
         * called after initSaveShips,
         * when all ships are placed
         */
        saveShips: function()
        {
            app.global.showLoader();
            
            this.model.initGridArray();
            
            var self = this;
             _.each($(".shipView"), function(item)
            {
                var sTop = $(item).offset().top,
                    sLeft =  $(item).offset().left,
                    shipData = 
                    {
                        length: $(item).data("shiplength"),
                        direction: $(item).data("direction")
                    };
                
                shipData.$matchedField = self.getMatchedFieldTooShipPos(sTop, sLeft);
                
                self.model.saveShipInGridArray(shipData);
            });
            this.model.sendShipsToServer();
        },
        
        
        /**
         *  returns a jQuery object containing ONLY the divs that match the return
         */
        getMatchedFieldTooShipPos: function(sTop, sLeft)
        {
            return $(".field").filter(function(i)
                    {
                        return $(this).offset().top == sTop && $(this).offset().left == sLeft;
                    });
        },
        
        
        /**
         * @param $ship to check position
         */
        checkShipPositionInGrid: function($ship)
        {
            var offsetTop = $(".grid_view").offset().top,
                offsetLeft = $(".grid_view").offset().left,
                shipOffsetTop = $ship.offset().top,
                shipOffsetLeft = $ship.offset().left;
            
            
            if(
                //ragt es oben oder links raus?
                (offsetTop <= shipOffsetTop && offsetLeft <= shipOffsetLeft) && 
                //ragt es unten raus?
                (shipOffsetTop + $ship.height() <= offsetTop + $(".grid_view").height()) &&
                // ragt es rechts raus?
                (shipOffsetLeft + $ship.width() <= offsetLeft + $(".grid_view").width())
              )
            {
                console.log("ship is valid");
                return true;
            }
            else
            {
                console.log("ship is NOT valid");
                return false;
            }
            
            //console.log("offsetTop: ", offsetTop, " offsetLeft: ", offsetLeft);
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initItemViews();
            var self = this;
            _.defer(function(){
                self.initDraggAndDrop();
            });
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