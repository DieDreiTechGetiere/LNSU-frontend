
define(function(require)
{
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var InfoView = Backbone.Marionette.ItemView.extend({
        
        template: require("text!views/content/match/placement/info/infoView.html"),
        /**
         * 
         */
        views: {
            SHIPCOUNT: "shipCountView"
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            saveBtn: ".save_ships",
            shipCount: ".shipcount_region"
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
        initViewCountView: function()
        {
            var ShipCountView = app.mapper.getViewFor(this.views.SHIPCOUNT);
            this.shipCountView = new ShipCountView({
                id: this.views.SHIPCOUNT,
                className: "shipcount_view",
                model: this.model.get("shipCount")
            });
            $(this.ui.shipCount).html(this.shipCountView.$el);
            this.shipCountView.finalize();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        initSaveShips: function()
        {
            app.vent.trigger(notification.command.match.SAVE_SHIPS);
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initViewCountView();
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
            "click @ui.saveBtn": "initSaveShips"
        }
    });
    return InfoView;
});