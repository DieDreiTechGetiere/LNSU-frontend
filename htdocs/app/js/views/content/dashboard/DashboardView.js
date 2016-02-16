define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var DashboardModel = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/dashboardView.html"),
        /**
         * 
         */
        itemViews: ["searchPlayer"],
        viewInstances: new Array(),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            playersearchRegion: ".playersearch_region"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.initViewListeners();     
            this.initItemViews();
            this.render();
        },
        
        
        /**
         * 
         */
        initItemViews: function()
        {
            for(e in this.itemViews)
            {
                var ItemView = app.mapper.getViewFor(this.itemViews[e] + "View");
                this.viewInstances[this.itemViews[e]] = new ItemView({
                    id: this.itemViews[e],
                    model: this.model.get(this.itemViews[e])
                });
                this.model.set("currentView", "dashboardView");
            }
        },
        
        
        /**
         * 
         */
        initViewListeners: function()
        {
            this.listenTo(this.model, "change", this.render, this);
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            
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
    return DashboardModel;
});