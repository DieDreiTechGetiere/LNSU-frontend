
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
        reInit: function()
        {
            //$(".shipView.ui-draggable").draggable("destroy");
            this.initDraggAndDrop();
        },
        
        
        /**
         * 
         */
        initDragg: function()
        {
            //$(".shipView:not(.dropped)").each(function(i){
              $(".shipView").each(function(i){
                $(this)
                    .draggable({
                        start: function(event,ui) {
                            if($(this).hasClass("dropped"))
                            {
                                $(this)
                                    .removeClass("dropped")
                                ;
                            }
                        },
                        stop: function(event,ui) {
                            
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
                    })
                ;
            });
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
              //      setTimeout(self.reInit, 500);
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
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initItemViews();
            var self = this;
            _.defer(function(){
                self.initDraggAndDrop()
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