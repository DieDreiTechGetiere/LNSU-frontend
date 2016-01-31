
define(function(require){
    
    var app = require("app")
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ApplicationRouter = Backbone.Router.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        routes: {

            "login": "routeLogin",
            
            "home": "routeHome",

            "home/list/:id": "routeListContent",
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
        
        routeLogin: function()
        {
            console.log("route /login");
            app.global.deleteUserCookie();
            app.view.showLoginView();
        },
        
        
        /**
         * 
         */
        routeHome: function()
        {
            console.log("route /home");
            
            _.defer(function(){
                app.global.checkIfUserIsValid() ? app.view.showHomeView() : app.router.navigate(notification.router.LOGIN);
            });
            
        },
        
        
        /**
         * 
         */
        routeListContent: function()
        {
            if(app.global.checkIfUserIsValid)
            {
                console.log("route /home/list/:id");
            }
            else
            {
                app.router.navigate(notification.router.LOGIN);
            }
        }
    });
    
    return ApplicationRouter;
});