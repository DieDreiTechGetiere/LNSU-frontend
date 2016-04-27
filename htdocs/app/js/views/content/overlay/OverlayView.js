

define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var OverlayView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/overlay/overlayView.html"),
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
            closeBtn: ".overlay_close_icon",
            button: ".button"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        closeOverlay: function()
        {
            app.model.set("overlayRegion", undefined);
            this.destroy();
        },
        
        
        /**
         * 
         */
        leaveMatchWarning: function(e)
        {
            if ($(e.currentTarget).hasClass("confirm"))
            {
                // wenn ok geklickt
                console.log("delete match");
                app.execute(notification.command.match.DELETE);
                app.execute(notification.command.application.LOGOUT);
            }
            else
            {
                // wenn abbruch geklickt
                app.router.navigate(notification.router.MATCH);
                app.model.set("overlayRegion", undefined);
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
            "click @ui.closeBtn": "closeOverlay",
            "click @ui.button": "leaveMatchWarning"
        }
    });
    return OverlayView;
});