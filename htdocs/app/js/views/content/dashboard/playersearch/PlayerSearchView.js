
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
        /**
         * 
         */
        timerValue: "PLAY",
        /**
         * 
         */
        timerInterval: undefined,
        /**
         * 
         */
        timerSeconds: 0,
        /**
         * 
         */
        timerMinutes: 0,


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
            this.listenTo(this.model, "clearTimer", this.stopTimer, this);
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        searchGame: function()
        {
            if(this.model.get("sending") == false)
            {
                this.animateLoader();
                this.model.initSearchGame();
                this.startTimer();
            }
            else
            {
                this.animateLoader();
                app.execute(notification.command.match.DELETE);
                this.model.clearPlayersearchInterval();
                this.model.set("sending", false);
                this.stopTimer();
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
        
        
        /**
         * sadly i couldnt go over the model here because of the re-rendering
         * after re-rendering the rotation animation stopps immediately... -.-""
         */
        startTimer: function()
        {
            var self = this;
            self.$(".play_btn").html("0:00");
            this.timerInterval = setInterval(function(){
                var timerSeconds = parseInt(self.timerSeconds) + 1;
                
                if(timerSeconds > 59)
                {
                    var timerMinutes = parseInt(self.timerMinutes) + 1;
                    self.timerSeconds = "00";
                    self.timerMinutes = timerMinutes;
                }
                else if(timerSeconds < 10)
                {
                    self.timerSeconds = "0" + timerSeconds;
                }
                else
                {
                    self.timerSeconds = timerSeconds;
                }
                
                self.timerValue = self.timerMinutes + ":" + self.timerSeconds;
                self.$(".play_btn").html(self.timerValue);
            }, 1000);
        },
        
        
        /**
         * 
         */
        stopTimer: function()
        {
            clearInterval(this.timerInterval);
            this.timerSeconds = 0;
            this.timerMinutes = 0;
            this.timerValue = "PLAY";
            this.$(".play_btn").html(this.timerValue);
        },
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        initTimeLineForRotation: function()
        {
            this.rotationTL.add(
            TweenMax.fromTo($(this.ui.playBg), 6,
                {
                    rotation: 0,
                },
                {
                    rotation: 360,
                    ease:Linear.easeOut,
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
        },
        
        
        events: {
            "click @ui.playBtn": "searchGame"
        }
    });
    return PlayerSearchView;
});