/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var settings = require("settings");
    

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
        
    };
    return MatchCommand;
});