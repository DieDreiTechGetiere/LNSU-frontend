
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
   //         console.log("route /");
        //    app.storageModel.deleteUserCookie();
            app.model.set("contentRegion", "signinView");
        },
        
        
        /**
         * 
         */
        routeDashboard: function()
        {
  //          console.log("route /dashboard");
            
            app.storageModel.checkIfUserIsLoggedIn() == true ? app.model.set("contentRegion", "dashboardView") : app.router.navigate(notification.router.LOGIN);
            app.vent.trigger(notification.event.CLOSE_ADMIN, true);
        },
        
        
        /**
         * 
         */
        routeDashboardAdmin: function()
        {
   //         console.log("route dashboard/admin");
            app.storageModel.showLoader();
            app.vent.trigger(notification.event.FETCH_ADMIN);
        },
        
        
        /**
         * 
         */
        routeToMatch: function()
        {
      //      console.log("route /match");
            app.storageModel.checkIfUserIsLoggedIn() == true ? app.model.set("contentRegion", "matchView") : app.router.navigate(notification.router.LOGIN);
        }
    });
    
    return ApplicationRouter;
});