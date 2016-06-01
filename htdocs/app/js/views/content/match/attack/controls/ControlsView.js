

define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var ControlsView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/match/attack/controls/controlsView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        views: {
            
        },
        /**
         * 
         */
        ui: {
            switchBtns: ".button",
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.listenTo(this.model, "change:whoseTurn", this.handleTurnChange, this);
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        switchFields: function(e)
        {
            app.vent.trigger(notification.event.SWITCH_GAME_FIELDS, "#" + $(e.currentTarget).attr('class').split(' ')[1]);
            this.$(".button").addClass("passive");
            $(e.currentTarget).removeClass("passive");
        },
        
        
        /**
         * 
         */
        handleTurnChange: function()
        {
            this.switchFields();
            this.render();
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
            var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
            this.$el.html(renderedTemplate);
            this.rendered = true;
        },
        
        
        events: {
            "click @ui.switchBtns": "switchFields"
        }
    });
    return ControlsView;
});