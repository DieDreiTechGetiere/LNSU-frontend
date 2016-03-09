
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var AdminView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/dashboard/admin/adminView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        ui: {
            close: ".close",
            inactiveItem: ".inactive_user",
            selectedBtn: ".selected",
            allBtn: ".all"
        },
        

        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.render();
        },
        
        /* @Methods -------------------------------------------------------------------------- */
        
        closeAdminView: function()
        {
            app.vent.trigger(notification.event.CLOSE_ADMIN);
        },
        
        
        /**
         * 
         */
        handleUserClick: function(e)
        {
            var target = $(e.currentTarget);
            if(target.hasClass("activate"))
            {
                target.removeClass("activate");
                this.model.removeUserToActivate(target.data("userid"));
            }
            else
            {
                target.addClass("activate");
                this.model.pushUserToActivate(target.data("userid"));
            }
        },
        
        
        /**
         * 
         */
        activateSelectedUsers: function()
        {
            app.global.showLoader();
            this.model.activateSelectedUsers();
        },
        
        
        /**
         * 
         */
        activateAllUsers: function()
        {
            app.global.showLoader();
            this.model.activateAllUsers();
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
            "click @ui.close": "closeAdminView",
            "click @ui.inactiveItem": "handleUserClick",
            "click @ui.allBtn": "activateAllUsers",
            "click @ui.selectedBtn": "activateSelectedUsers"
        }
    });
    return AdminView;
});