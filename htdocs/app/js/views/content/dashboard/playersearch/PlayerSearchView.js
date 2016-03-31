
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
        rotationTL: new TimelineMax({onComplete: function(){
            this.restart();
        }}),
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
            if(this.model.get("sending") == false)
            {
                this.animateLoader();
                this.model.initSearchGame();
            }
            else
            {
                this.animateLoader();
                app.execute(notification.command.match.DELETE);
                this.model.clearPlayersearchInterval();
                this.model.set("sending", false);
            }
        },
        
        
        /**
         * 
         */
        animateLoader: function()
        {
            if($(this.ui.playBg).hasClass("animating"))
            {
                $(this.ui.playBg).removeClass("animating");
                this.rotationTL.pause();
            }
            else
            {
                $(this.ui.playBg).addClass("animating");
                this.rotationTL.play();
            }
        },
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        initTimeLineForRotation: function()
        {
            var rotationTween = 
                
            this.rotationTL.add(
            TweenMax.fromTo($(this.ui.playBg), 6, 
                {
                    rotation: 0,
                },
                {
                    rotation: 360,
                    ease:Linear.easeNone,
                    delay:0,
                    reapeat:-1
                }
            )).pause();
        },
        
        
        finalize: function()
        {
            this.initTimeLineForRotation();
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