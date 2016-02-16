
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var PlayerSearchModel = require("models/content/dashboard/playersearch/PlayerSearchModel");
    
    var DashboardModel = Backbone.Model.extend({
        defaults:{
            id: "dashboard"
        },
        
        
        initialize: function()
        {
            
        },
        
        
        /**
         * which will be filled up with passed data later..
         */
        initItemModels: function(data)
        {
            this.set("playerSearch", new PlayerSearchModel());
        },
        
        
        /**
         * 
         */
        fetchDashboardData: function()
        {
            console.log("fetchDashboardData");
            // fetch data here - call to backend
            
            
            //onComplete, 
            // pass data.toJSON()
            // and hideLoader at some point...  ->
            // this.initItemModels(data);
            
            app.execute(notification.command.application.INIT_DASHBOARD);
        }
    });
    return DashboardModel;
});