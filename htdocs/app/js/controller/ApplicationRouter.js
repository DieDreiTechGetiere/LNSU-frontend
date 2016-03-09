
define(function(require){
    
    var app = require("app")
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ApplicationRouter = Backbone.Router.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        routes: {

            "": "routeSignin",
            
            "dashboard": "routeDashboard",

            "match": "routeToMatch"
        //    "home/list/:id": "routeListContent",
            
            
        },
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        
        /**
         * 'execute' gets executed BEFORE each route gets executed
         */
        execute: function(callback, args, name)
        {
            if (callback)
            {
                callback.apply(this, args);
            }
            else
            { }
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        routeSignin: function()
        {
            console.log("route /");
        //    app.global.deleteUserCookie();
            app.model.set("contentRegion", "signinView");
        },
        
        
        /**
         * 
         */
        routeDashboard: function()
        {
            console.log("route /dashboard");
            
            app.global.checkIfUserIsLoggedIn() == true ? app.model.set("contentRegion", "dashboardView") : app.router.navigate(notification.router.LOGIN);
        },
        
        
        /**
         * 
         */
        routeToMatch: function()
        {
            console.log("route /match");
            app.global.checkIfUserIsLoggedIn() == true ? app.model.set("contentRegion", "matchView") : app.router.navigate(notification.router.LOGIN);
        }
    });
    
    return ApplicationRouter;
});