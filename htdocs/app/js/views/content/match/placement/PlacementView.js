
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    var settings = require("settings");
    
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
            shipsRegion: ".ships_region",
            game: ".game"
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
            this.viewInstances[this.views.SHIPS] = new Backbone.Marionette.CollectionView({
                id: "shipsView",
                className: "ships_view",
                collection: self.model.get("ships"),
                childView: app.mapper.getViewFor(self.views.SHIPS)
            });
            $(this.ui.shipsRegion).html(this.viewInstances[this.views.SHIPS].render().el);
            
            this.viewInstances[this.views.SHIPS].children.each(function(view){
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
                    start: function(event,ui) 
                    {
                        if($(event.currentTarget).hasClass("dropped"))
                        {   
                            $(this).removeClass("dropped");
                        }
                    },
                    stop: function(event,ui) 
                    {
                        var offsetLeftGrid = $(".grid_view").offset().left + $(".grid_view").width();
                        if($(this).offset().left > offsetLeftGrid)
                        {
                            if($(this).width() <= 60)
                            {
                                $(this).trigger("contextmenu");
                                var self = this;
                            }
                        }
                    },
                    revert : function(event, ui) 
                    {
                        $(this).removeClass("dragging");
                        $(this).data("ui-draggable").originalPosition = {
                            top : $(this).data("defaulttop").slice(0, -2),
                            left : 30
                        };
                        return !event;
                    },
                    grid: [60, 60],
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
            $(this.ui.game).droppable({
                accept: '.shipView',
                drop: function(event,ui) {
                    
                    ui.draggable
                        .addClass("dropped");
                    
                    if(self.checkShipPositionInGrid(ui.draggable) == false)
                    {
                        self.resetShip(ui.draggable);
                    }
                                
                    setTimeout(function(){
                        self.initDraggAndDrop();
                    }, 200);
                }
            });
        },
        
        
        /**
         * reset ship to its originalPosition
         * for any invalid case..
         * @param $ship (jquery object)
         */
        resetShip: function($ship)
        {
            $ship.animate({
                top: $ship.data("defaulttop"),
                left: 30
            }, 700, function(){
                if($(this).width() <= 60)
                {
                    var self = this;
                    setTimeout(function(){
                        $(self).trigger("contextmenu");
                    }, 100);
                    
                }
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
                //ragt es unten raus?   -1... idk why...
                (shipOffsetTop + $ship.height() - 1 <= offsetTop + $(".grid_view").height()) &&
                // ragt es rechts raus?
                (shipOffsetLeft + $ship.width() - 1 <= offsetLeft + $(".grid_view").width())
              )
            {
                if(this.checkForShipCollision($ship) == false)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                console.log("ship is NOT valid");
                return false;
            }
        },
        
        
        /**
         * @param $ship (jquery object)
         * @return boolean
         */
        checkForShipCollision: function($ship)
        {
            var collision;
            $.each($(".shipView.dropped"), function(item)
            {
                var $item = $(this);
                
                if(!$item.hasClass("ui-draggable-dragging"))
                {
                    var itemLeft = $item.offset().left,
                        itemTop = $item.offset().top,
                        itemRight = $item.width() + itemLeft,
                        itemBottom = $item.height() + itemTop,
                        
                        shipLeft = $ship.offset().left,
                        shipTop = $ship.offset().top,
                        shipRight = $ship.width() + shipLeft,
                        shipBottom = $ship.height() + shipTop;
                    
                    if(
                        (
                            (itemLeft == shipLeft) && 
                            (itemTop == shipTop ||  itemBottom == shipBottom)
                        ) ||
                        (
                            (itemRight == shipRight) &&
                            (itemTop == shipTop || itemBottom == shipBottom)
                        )
                    )
                    {
                        collision = true;
                        return false;
                    }
                    else
                    {
                        collision = false;
                    }
                }
            });
            return collision == true ? true : false;
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
                if(this.checkForShipSpacing() == true)
                {
                    this.saveShips();
                    console.log("gridArray: ", this.model.get("gridArray"));
                }
                else
                {
                    alert("Now all ships are placed correctly.");
                }
            }
            else
            {
                if(settings.appEnvironment == "dev")
                {
                    //to initialize attack view immediately
                    app.execute(notification.command.match.ATTACK);
                    return false;
                }
                alert("Please place all ships before saving!");
            }
        },
        
        
        /**
         * called after initSaveShips,
         * when all ships are placed
         * 
         * saves each shipPosition in array like backend needs it 
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
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        /**
         * delete/destroy all childviews
         */
        onBeforeDestroy: function()
        {
            for(e in this.viewInstances)
            {
                this.viewInstances[e].destroy();
            }
        },
        
        
        /**
         * 
         */
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