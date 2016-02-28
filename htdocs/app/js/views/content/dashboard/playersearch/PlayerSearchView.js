
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var PlayerSearchView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */

        template: require("text!views/content/dashboard/playersearch/playerSearchView.html"),
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
            playBtn: ".play_btn",
            playBg: ".play_bg"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            console.log("playersearchmodel: ", this.model);
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
        
        searchGame: function()
        {
            if($(this.ui.playBg).hasClass("rotate"))
            {
                $(this.ui.playBg).removeClass("rotate");
            }
            else
            {
                $(this.ui.playBg).addClass("rotate");
            }
        },
        
        
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
            "click @ui.playBtn": "searchGame"
        }
    });
    return PlayerSearchView;
});