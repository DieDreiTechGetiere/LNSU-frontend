/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var UserModel = require("models/UserModel");

    var ApplicationCommand = {
        //@methods----------------------------------------------------------------------

        /**
         *
         */
        handleLoginSuccess: function(userData)
        {
            app.userModel = new UserModel({
                id: userData.id,
                accountName: userData.accountName
            });
            app.model.get("dashboard").fetchDashboardData();
        },


        /**
         * 
         */
        initDashboardView: function()
        {
            app.view.initDashboardView();
        }
    };
    return ApplicationCommand;
});