
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var HighscoreView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/highscore/highscoreView.html"),
        /**
         * 
         */
        views: {
            ITEM: "highscoreItemView"
        },
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            highscores: ".highscores"
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
        
        /**
         * 
         */
        initHighscoreCollectionView: function () 
        {
            var self = this;
            this.highscoreColl = new Backbone.Marionette.CollectionView({
                id: "highscoreCollection",
                className: "highscore_collection",
                collection: self.model.get("highscores"),
                childView: app.mapper.getViewFor(self.views.ITEM)
            });
            $(this.ui.highscores).html(self.highscoreColl.render().el);
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initHighscoreCollectionView();
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
    return HighscoreView;
});