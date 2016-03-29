
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    var settings = require("settings");
    
    var AdminModel = Backbone.Model.extend({
        
        url: settings.backendBaseUrl + "dashboard/inactive",
        
        defaults: {
            "inactives": undefined,
            "activate": new Array()
        },
        
        
        initialize: function(options)
        {
            this.set("inactives", new Array());
            for(var e = 0; e < options.length; e++)
            {
                this.get("inactives").push(options[e]);
                this.unset(e);
            }
        },
        
        
        /**
         * 
         */
        pushUserToActivate: function(userid)
        {
            this.get("activate").push(userid);
            console.log("user to activate: ", userid);
        },
        
        
        /**
         * 
         */
        removeUserToActivate: function(userid)
        {
            var index = this.get("activate").indexOf(userid);
            if (index > -1) 
            {
                this.get("activate").splice(index, 1);
            }
        },
        
        
        /**
         * 
         */
        activateSelectedUsers: function()
        {
            this.unset("inactives");
            if(this.get("activate").length > 0)
            {
                app.global.showLoader();
                this.save(null, 
                {
                    success: function(data, response)
                    {
                        app.global.hideLoader();
                        app.vent.trigger(notification.event.CLOSE_ADMIN);
                    },
                    error: function(data, error)
                    {
                        app.global.hideLoader();
                        app.vent.trigger(notification.event.CLOSE_ADMIN);
                        console.log("error: ", error);
                    }
                });
            }
        },
        
        
        /**
         * 
         */
        activateAllUsers: function()
        {
            this.set("activate", new Array());
            
            for(var e = 0; e < this.get("inactives").length; e++)
            {
                this.get("activate").push(parseInt(this.get("inactives")[e].id));
            }
            
            this.activateSelectedUsers();
        },
        
        
        /**
         * 
         */
        onBeforeDestroy: function()
        {
            this.unset("activate");
        }
    });
    return AdminModel;
});