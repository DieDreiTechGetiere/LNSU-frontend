
define(function(require){
    
    var app = require("app")
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ApplicationRouter = Backbone.Router.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        routes: {

            "": "routeSignin",
            
            "dashboard": "routeDashboard",
            
            "dashboard/admin": "routeDashboardAdmin",

            "match": "routeToMatch"
        //    "home/list/:id": "routeListContent",
            
            
        },
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        
        /**
         * 'execute' gets executed BEFORE each route gets executed
         */
        execute: function(callback, args, name)
        {
            if (callback && app.global.get("matchActive") == undefined)
            {
                callback.apply(this, args);
            }
            else
            { 
                if(app.global.get("matchActive") == "active")
                {
                    this.warnUserToLeaveMatch();
                }
            }
        },
        
        
        /**
         * 
         */
        warnUserToLeaveMatch: function()
        {
            if (confirm('if you leave your match now, you will automatically lose!'))
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
            }
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        routeSignin: function()
        {
            app.model.set("contentRegion", "signinView");
        },
        
        
        /**
         * 
         */
        routeDashboard: function()
        {
            if(app.storageModel.checkIfUserIsLoggedIn() == true)
            {
                app.model.set("contentRegion", "dashboardView");
                app.vent.trigger(notification.event.CLOSE_ADMIN, true);
            }
            else
            {
                app.execute(notification.command.application.LOGOUT);
            }
        },
        
        
        /**
         * 
         */
        routeDashboardAdmin: function()
        {
            if(app.storageModel.checkIfUserIsLoggedIn() == true)
            {
                if(app.userModel.get("role") == 1)
                {
                    app.global.showLoader();
                    app.vent.trigger(notification.event.FETCH_ADMIN);
                }
            }
            else
            {
                app.router.navigate(notification.router.LOGIN);
            }
        },
        
        
        /**
         * 
         */
        routeToMatch: function()
        {
      //      console.log("route /match");
            if(app.storageModel.checkIfUserIsLoggedIn() == true)
            {
                app.model.set("contentRegion", "matchView")
                app.global.set("matchActive", "active");
            }
            else
            {
                app.router.navigate(notification.router.LOGIN);
            }
        }
    });
    
    return ApplicationRouter;
});