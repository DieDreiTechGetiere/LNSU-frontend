/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var settings = require("settings");
    var notification = require("notification");

    var MatchCommand = {
        //@methods----------------------------------------------------------------------

        /**
         *
         */
        deleteMatch: function()
        {
            app.matchModel.destroy({
                url: settings.backendBaseUrl + "game/search?id=" + app.matchModel.get("id"),
                
                success: function(data)
                {
                    console.log("delete success: ", data);
                },
                error: function(error)
                {
                    console.log("delete error: ", error);
                }
            });
        },
        
        
        /**
         * 
         */
        startMatch: function()
        {
            app.view.initMatchView();
            
            _.defer(function(){
                app.router.navigate(notification.router.MATCH, {trigger: true});
            });
        },
        
        
        /**
         * 
         */
        startAttack: function()
        {
            console.log("start attack");
        },
        
        
        /**
         * @param container
         */
        initGridView: function(container)
        {
            var GridView = app.mapper.getViewFor("gridView");
            var gridView = new GridView({
                id: "gridView",
                className: "grid_view"
            });
            $(container).html(gridView.el);
            gridView.finalize();
        },
        
    };
    return MatchCommand;
});