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
        
        gridView: undefined,
        
        
        /**
         *
         */
        deleteMatch: function()
        {
            try 
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
            }
            catch(err) 
            {
                //no matchModel instanze yet
            }
            
            
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
            app.view.initAttackView();
        },
        
        
        /**
         * @param container
         */
        initGridView: function(container, classId)
        {
            var gridViewId = classId == undefined ? "gridView" : classId;
            
            var GridView = app.mapper.getViewFor("gridView");
            this.gridView = new GridView({
                id: gridViewId,
                className: "grid_view"
            });
            $(container).html(this.gridView.el);
            this.gridView.finalize();
        },
        
    };
    return MatchCommand;
});