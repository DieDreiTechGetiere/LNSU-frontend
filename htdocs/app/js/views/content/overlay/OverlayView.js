

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
            
            if(this.$el.attr("id") !== "error")
            {
                app.router.navigate(notification.router.MATCH);
            }
            else if(this.$el.attr("id") == "win" || this.$el.attr("id") == "loss")
            {
                //or location.reload() ??
                app.router.navigate(notification.router.DASHBOARD, {trigger: true});
            }
            
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
                app.global.showLoader();
                app.execute(notification.command.match.DELETE, true);
            }
            else if($(e.currentTarget).hasClass("close"))
            {
                if(this.$(".interrupt") != undefined)
                {
                    app.router.navigate(notification.router.MATCH);
                    app.model.set("overlayRegion", undefined);
                }
                this.closeOverlay();
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